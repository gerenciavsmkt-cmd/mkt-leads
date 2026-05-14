const apiUrl = "http://127.0.0.1:8080";
const apiKey = "42247732-1594-42cc-9430-194165683244";

async function cleanup() {
  try {
    console.log("Buscando instâncias...");
    const res = await fetch(`${apiUrl}/instance/fetchInstances`, {
      headers: { "apikey": apiKey }
    });
    const instances = await res.json();
    const list = Array.isArray(instances) ? instances : (instances.value || []);
    
    console.log(`Encontradas ${list.length} instâncias.`);
    
    for (const inst of list) {
      const name = inst.name || inst.instanceName;
      console.log(`Deletando: ${name}...`);
      const delRes = await fetch(`${apiUrl}/instance/delete/${name}`, {
        method: 'DELETE',
        headers: { "apikey": apiKey }
      });
      console.log(`Resultado: ${delRes.statusStatus || delRes.status}`);
    }
    console.log("Limpeza concluída!");
  } catch (e) {
    console.error("Erro:", e.message);
  }
}

cleanup();
