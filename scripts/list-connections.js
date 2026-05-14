// Listagem via REST

// Let's use the REST API approach but with the correct collection
async function listConnections() {
  const projectId = 'gerency-leads';
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/whatsapp_connections`;
  
  try {
    console.log('--- Listando Conexões no Firestore ---');
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.documents) {
      data.documents.forEach(doc => {
        const id = doc.name.split('/').pop();
        const nome = doc.fields.nome?.stringValue;
        console.log(`ID: ${id} | Nome: ${nome}`);
      });
    } else {
      console.log('Nenhuma conexão encontrada na coleção whatsapp_connections.');
    }
  } catch (e) {
    console.log('Erro:', e.message);
  }
}

listConnections();
