'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';

export async function sendOmnichannelMessageAction(
  recipientIdOrPhone: string, 
  channel: string, 
  text: string, 
  connectionId?: string
) {
  try {
    // 1. Lógica para INSTAGRAM e FACEBOOK
    if (channel === 'instagram' || channel === 'facebook') {
      const settingsSnap = await getDoc(doc(db, 'settings', 'global'));
      const settings = settingsSnap.exists() ? settingsSnap.data() : {};
      
      const token = channel === 'instagram' 
        ? (settings.omnichannel?.instagramAccessToken || settings.instagramAccessToken)
        : (settings.omnichannel?.messengerAccessToken || settings.messengerAccessToken);

      if (!token) {
        return { success: false, error: `Token de acesso não configurado para ${channel}.` };
      }

      const response = await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: { id: recipientIdOrPhone },
          message: { text: text }
        })
      });

      const data = await response.json();
      return response.ok ? { success: true, data } : { success: false, error: data.error?.message };
    }

    // 2. Lógica para WHATSAPP
    if (channel === 'whatsapp') {
      let targetConnectionId = connectionId;

      // Se não temos um ID de conexão, ou se queremos garantir que usamos a principal
      if (!targetConnectionId) {
        const principalQuery = query(
          collection(db, 'whatsapp_connections'), 
          where('isPrincipal', '==', true),
          limit(1)
        );
        const principalSnap = await getDocs(principalQuery);
        if (!principalSnap.empty) {
          targetConnectionId = principalSnap.docs[0].id;
        }
      }

      if (!targetConnectionId) {
        return { success: false, error: 'Nenhuma conexão WhatsApp (Principal ou Específica) encontrada.' };
      }

      // Buscar os detalhes da conexão específica
      const connSnap = await getDoc(doc(db, 'whatsapp_connections', targetConnectionId));
      if (!connSnap.exists()) {
        return { success: false, error: 'Conexão WhatsApp não encontrada no sistema.' };
      }

      const conn = connSnap.data();

      // Buscar Configurações Globais (Para URL global da Evolution API)
      const settingsSnap = await getDoc(doc(db, 'settings', 'global'));
      const settings = settingsSnap.exists() ? settingsSnap.data() : {};

      // 2.A: Envio via API OFICIAL DA META
      if (conn.type === 'meta_official') {
        const token = conn.metaAccessToken;
        const phoneId = conn.metaPhoneNumberId;
        
        if (!token || !phoneId) {
          return { success: false, error: 'Credenciais da API Oficial ausentes nesta conexão.' };
        }

        const response = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: recipientIdOrPhone,
            type: "text",
            text: { body: text }
          })
        });

        const data = await response.json();
        return response.ok ? { success: true, data } : { success: false, error: data.error?.message };
      }

      // 2.B: Envio via EVOLUTION API
      if (conn.type === 'evolution_api') {
        const apiUrl = settings.omnichannel?.evolutionApiUrl;
        const globalApiKey = settings.omnichannel?.evolutionApiKey;
        const instanceName = conn.evolutionInstanceName;

        // Validação p/ Modo Simulação
        if (!apiUrl || !globalApiKey) {
          console.warn('Modo Simulação: Mensagem "enviada" localmente pois a URL oficial não está configurada.');
          return { success: true, mock: true, message: 'Mensagem simulada com sucesso.' };
        }

        const evolutionReqUrl = `${apiUrl.replace(/\/$/, '')}/message/sendText/${instanceName}`;
        
        const isLid = recipientIdOrPhone.includes('@lid') || (recipientIdOrPhone.length > 13 && !recipientIdOrPhone.startsWith('55'));
        let cleanNumber = recipientIdOrPhone.replace(/[^\d@lid]/g, '');
        
        if (isLid && !cleanNumber.includes('@lid')) {
          cleanNumber = cleanNumber.split('@')[0] + '@lid';
        }
        
        console.log(`>>> Enviando para Evolution: ${cleanNumber} (LID: ${isLid})`);

        const response = await fetch(evolutionReqUrl, {
          method: 'POST',
          headers: {
            'apikey': globalApiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            number: cleanNumber,
            text: text, // No v2 o texto é direto aqui
            options: {
              delay: 1200,
              presence: "composing",
              linkPreview: false
            }
          })
        });

        const data = await response.json();
        console.log('>>> Resposta do Docker:', JSON.stringify(data));
        
        return response.ok ? { success: true, data } : { success: false, error: data.error || 'Erro no Docker' };

      }
    }

    return { success: false, error: 'Canal desconhecido.' };

  } catch (error: any) {
    console.error(`Erro ao enviar mensagem via omnichannel:`, error);
    return { success: false, error: 'Erro interno do servidor ao enviar a mensagem.' };
  }
}
