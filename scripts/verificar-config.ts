import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { db } from '../src/lib/firebase.ts';
import { collection, getDocs } from 'firebase/firestore';

async function run() {
  console.log('--- Verificando Conexões do CRM ---');
  const connectionsRef = collection(db, 'whatsapp_connections');
  const connSnap = await getDocs(connectionsRef);
  
  if (connSnap.empty) {
    console.log('Nenhuma conexão encontrada no Firestore.');
  }

  connSnap.forEach(d => {
    const data = d.data();
    console.log(`- Conexão: ${data.name}`);
    console.log(`  Instância: ${data.evolutionInstanceName}`);
    console.log(`  API Key: ${data.evolutionApiKey || 'N/A'}`);
    console.log(`  URL: ${data.evolutionApiUrl || 'N/A'}`);
    console.log('----------------------------');
  });
}

run().then(() => process.exit(0)).catch(err => {
  console.error('Erro:', err);
  process.exit(1);
});
