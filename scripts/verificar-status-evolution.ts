import { db } from './src/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

async function checkStatus() {
  try {
    const settingsSnap = await getDoc(doc(db, 'settings', 'global'));
    const settings = settingsSnap.data() || {};
    const apiUrl = settings.omnichannel?.evolutionApiUrl;
    const apiKey = settings.omnichannel?.evolutionApiKey;

    console.log('--- Configurações Evolution ---');
    console.log('API URL:', apiUrl);
    console.log('API Key:', apiKey ? 'Configurada (Oculta)' : 'Não configurada');

    if (!apiUrl) {
      console.log('ERRO: URL da Evolution API não está configurada.');
      return;
    }

    console.log('\n--- Testando Conexão com Servidor ---');
    try {
      const res = await fetch(`${apiUrl.replace(/\/$/, '')}/instance/fetchInstances`, {
        headers: { 'apikey': apiKey }
      });
      console.log('Status HTTP:', res.status);
      if (res.ok) {
        const data = await res.json();
        console.log('Resposta do Servidor (OK):', JSON.stringify(data).substring(0, 100) + '...');
        console.log('O SERVIDOR ESTÁ ONLINE!');
      } else {
        const text = await res.text();
        console.log('Erro do Servidor:', text);
      }
    } catch (e: any) {
      console.log('FALHA NA CONEXÃO:', e.message);
      if (e.message.includes('ECONNREFUSED')) {
        console.log('DICA: O servidor parece estar desligado ou a porta está bloqueada.');
      }
    }
  } catch (err: any) {
    console.error('Erro ao acessar Firebase:', err.message);
  }
}

checkStatus();
