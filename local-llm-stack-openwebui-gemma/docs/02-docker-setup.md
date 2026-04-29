# 🐳 Docker Setup

## Create Network

```bash
docker network create openwebui-net
```

---

## Run Ollama

```bash
docker run -d \
  --name ollama \
  --network openwebui-net \
  -p 11434:11434 \
  ollama/ollama
```

---

## Run Open WebUI

```bash
docker run -d \
  --name open-webui \
  --network openwebui-net \
  -p 3000:8080 \
  -e OLLAMA_BASE_URL=http://ollama:11434 \
  ghcr.io/open-webui/open-webui:main
```

---

## Access

```
http://localhost:3000
```

---

## Flow

```
WebUI Container → Backend → Ollama Container → Model
```

