const API_URL = 'http://localhost:8080';
const API_KEY = '42247732-1594-42cc-9430-194165683244';
const WEBHOOK_URL = 'http://host.docker.internal:3000/api/webhook/evolution';

async function reconnectAtendimento() {
  console.log('🚀 Reativando instância "atendimento" na Evolution v2...');

  try {
    const response = await fetch(`${API_URL}/instance/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': API_KEY
      },
      body: JSON.stringify({
        instanceName: 'atendimento',
        token: API_KEY,
        qrcode: true,
        integration: 'WHATSAPP-BAILEYS'
      })
    });

    const data = await response.json();

    if (response.ok || data.status === 403 || data.error === 'Forbidden') {
      console.log('✅ Instância "atendimento" pronta ou já existente.');
      
      // Configurar Webhook na v2
      console.log('🔗 Configurando Webhook...');
      const webhookRes = await fetch(`${API_URL}/webhook/set/atendimento`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': API_KEY
        },
        body: JSON.stringify({
          webhook: {
            enabled: true,
            url: WEBHOOK_URL,
            webhookByEvents: true,
            events: [
              "MESSAGES_UPSERT",
              "MESSAGES_UPDATE",
              "MESSAGES_DELETE",
              "SEND_MESSAGE",
              "CONTACTS_UPSERT",
              "CONTACTS_UPDATE",
              "PRESENCE_UPDATE",
              "CHATS_UPSERT",
              "CHATS_UPDATE"
            ]
          }
        })
      });

      if (webhookRes.ok) {
        console.log('✅ Webhook configurado com sucesso!');
      } else {
        const errorData = await webhookRes.json();
        console.error('❌ Erro ao configurar Webhook:', errorData);
      }

      console.log('\n--- PRÓXIMO PASSO ---');
      console.log('Acesse o painel ou use o link abaixo para ver o QR Code:');
      console.log(`${API_URL}/instance/connect/atendimento`);
    } else {
      console.error('❌ Erro ao criar instância:', data);
    }
  } catch (error) {
    console.error('❌ Falha na conexão com o Docker:', error);
  }
}

reconnectAtendimento();
