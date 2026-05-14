import requests
import json

url_base = "http://127.0.0.1:8080"
api_key = "42247732-1594-42cc-9430-194165683244"
headers = {"apikey": api_key}

def cleanup():
    try:
        print("Buscando instâncias...")
        res = requests.get(f"{url_base}/instance/fetchInstances", headers=headers)
        instances = res.json()
        
        # Na v2 a estrutura pode ser uma lista direta ou um objeto com 'value'
        instance_list = instances if isinstance(instances, list) else instances.get('value', [])
        
        print(f"Encontradas {len(instance_list)} instâncias.")
        
        for inst in instance_list:
            name = inst.get('name') or inst.get('instanceName')
            if name:
                print(f"Deletando: {name}...")
                del_res = requests.delete(f"{url_base}/instance/delete/{name}", headers=headers)
                print(f"Resultado: {del_res.status_code}")
                
        print("Limpeza concluída!")
    except Exception as e:
        print(f"Erro: {e}")

if __name__ == "__main__":
    cleanup()
