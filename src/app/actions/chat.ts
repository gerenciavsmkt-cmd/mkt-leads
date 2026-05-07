'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function sendMetaMessageAction(leadId: string, channel: string, text: string) {
  try {
    // 1. Buscar tokens nas configurações globais
    const settingsSnap = await getDoc(doc(db, 'settings', 'global'));
    const settings = settingsSnap.exists() ? settingsSnap.data() : {};
    
    // O token pode estar em settings.omnichannel ou direto em settings (depende de como foi salvo)
    const token = channel === 'instagram' 
      ? (settings.omnichannel?.instagramAccessToken || settings.instagramAccessToken)
      : (settings.omnichannel?.messengerAccessToken || settings.messengerAccessToken);

    if (!token) {
      console.error('Token de acesso não encontrado para o canal:', channel);
      return { success: false, error: 'Token de acesso não configurado no sistema.' };
    }

    // 2. Chamar a API do Meta
    // Para Messenger e Instagram, o endpoint é o mesmo, muda apenas o token
    const response = await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: leadId },
        message: { text: text }
      })
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      console.error('Erro na API do Meta:', data);
      return { 
        success: false, 
        error: data.error?.message || 'Erro ao enviar mensagem para o Facebook/Instagram.' 
      };
    }
  } catch (error: any) {
    console.error('Erro ao enviar mensagem via Meta:', error);
    return { success: false, error: 'Erro interno ao processar envio.' };
  }
}
