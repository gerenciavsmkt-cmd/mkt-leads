const API_URL = 'http://localhost:8080';
const API_KEY = '42247732-1594-42cc-9430-194165683244'; // A que definimos no docker-compose

async function createInstance() {
  console.log('🚀 Criando instância na Evolution API...');

  const response = await fetch(`${API_URL}/instance/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': API_KEY
    },
    body: JSON.stringify({
      instanceName: 'GerencyLeads_Main',
      token: 'token_gerency_leads_123', // Um token de segurança para esta instância
      qrcode: true,
      number: '' // Pode deixar vazio para o QR Code geral
    })
  });

  const data = await response.json();

  if (response.ok) {
    console.log('✅ Instância criada com sucesso!');
    console.log('-----------------------------------');
    console.log('ID da Instância:', data.instance.instanceName);
    console.log('Token da Instância:', data.hash.apikey);
    console.log('-----------------------------------');
    console.log('\n🔗 Agora você precisa obter o QR Code para escanear.');
  } else {
    console.error('❌ Erro ao criar instância:', data);
  }
}

createInstance();
