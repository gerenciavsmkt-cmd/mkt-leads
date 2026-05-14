import { db } from '../src/lib/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

async function resetStatus() {
  console.log('Buscando conexão "atendimento" para resetar...');
  const q = query(collection(db, 'whatsapp_connections'), where('evolutionInstanceName', '==', 'atendimento'));
  const snap = await getDocs(q);
  
  if (snap.empty) {
    console.log('Conexão não encontrada.');
    return;
  }

  for (const d of snap.docs) {
    await updateDoc(doc(db, 'whatsapp_connections', d.id), {
      status: 'disconnected'
    });
    console.log(`Conexão ${d.id} resetada para "disconnected".`);
  }
}

resetStatus().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
