# 🧩 Manual Setup (npm + Python)

## Step 1: Clone Repo

```bash
git clone https://github.com/open-webui/open-webui.git
cd open-webui
```

---

## Step 2: Frontend

```bash
npm install
npm run dev
```

Access:

```
http://localhost:5173
```

---

## Step 3: Backend

Before running the command check path :

```bash
cd backend
python3 -m venv ~/.venvs/root-dir-of-project
source ~/.venvs/rootdir-of-project/bin/activate
pip install -r requirements.txt
```

Run:

```bash
OLLAMA_BASE_URL=http://localhost:11434 \
uvicorn open_webui.main:app --host 0.0.0.0 --port 8080
```

---

## Step 4: Ollama

```bash
ollama serve
ollama pull gemma:2b
```

---

## Flow

```
Frontend (5173)
→ Backend (8080)
→ Ollama (11434)
→ Gemma Model
```
