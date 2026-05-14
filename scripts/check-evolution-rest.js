// Teste de status via REST

// Tenta carregar credenciais locais se existirem, senão usa config padrão do ambiente
// Como não temos a service account key, vamos tentar usar o firebase-admin com a config do projeto
// Mas sem service account, ele só funciona dentro da GCP.
// No entanto, podemos tentar ler os settings via REST API do Firebase se soubermos o Project ID.

async function checkRest() {
  const projectId = 'gerency-leads';
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/settings/global`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.fields) {
      const omnichannel = data.fields.omnichannel?.mapValue?.fields;
      const apiUrl = omnichannel?.evolutionApiUrl?.stringValue;
      const apiKey = omnichannel?.evolutionApiKey?.stringValue;
      
      console.log('--- Configurações Evolution Encontradas (via REST) ---');
      console.log('URL:', apiUrl);
      
      if (!apiUrl) {
        console.log('ERRO: URL não configurada no Firestore.');
        return;
      }
      
      console.log('\n--- Testando Servidor ---');
      try {
        const ping = await fetch(`${apiUrl.replace(/\/$/, '')}/instance/fetchInstances`, {
          headers: { 'apikey': apiKey }
        });
        console.log('HTTP Status:', ping.status);
        if (ping.ok) {
          console.log('O SERVIDOR EVOLUTION ESTÁ ONLINE! ✅');
        } else {
          console.log('O SERVIDOR RESPONDEU COM ERRO ❌');
        }
      } catch (e) {
        console.log('NÃO FOI POSSÍVEL CONECTAR AO SERVIDOR ❌');
        console.log('Erro:', e.message);
      }
    } else {
      console.log('Não foi possível ler as configurações do Firestore.');
    }
  } catch (e) {
    console.log('Erro ao consultar REST API do Firebase:', e.message);
  }
}

checkRest();
