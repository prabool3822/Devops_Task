# StackPilot : Dockerized a fullstack project that can clone , test , build your repo and print logs.

A simple full-stack project to learn Docker by running **frontend, backend, and database in separate containers**.

---

## 📌 What this project does

* Add a repository (dummy)
* Click **Deploy**
* See build logs (simulated)
* Track build status

👉 This project simulates how CI/CD tools work.

---

## 🧠 Tech Used

* Frontend → React (Vite)
* Backend → Node.js (Express)
* Database → PostgreSQL
* DevOps → Docker

---

## 🏗️ How it works

```text
Frontend → Backend → Database
```

* Frontend sends requests
* Backend processes and stores data
* Database saves repos and logs

---

# ⚙️ Services
Service	Port	Description
Frontend	5173	UI (Vite dev server)
Backend	5000	API server
Database	5432	PostgreSQL

## 🐳 Run with Docker (Easy way)

### 1. Clone repo

```bash
git clone https://github.com/YOUR_USERNAME/stackpilot-ci.git
cd stackpilot-ci
```

---

### 2. Start everything

```bash
docker-compose up --build
```

---

### 3. Open in browser

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

---

## ⚙️ Run without docker-compose (Manual)

### 1. Create network

```bash
docker network create stackpilot-net
```

---

### 2. Run database

```bash
docker run -d --name dev-db --network stackpilot-net \
-e POSTGRES_USER=devdeploy \
-e POSTGRES_PASSWORD=devdeploy_password \
-e POSTGRES_DB=devdeploy_db \
-p 5432:5432 postgres:15
```

---

### 3. Run backend

```bash
docker run -d --name dev-backend --network stackpilot-net \
-e DB_USER=devdeploy \
-e DB_PASSWORD=devdeploy_password \
-e DB_HOST=dev-db \
-e DB_PORT=5432 \
-e DB_NAME=devdeploy_db \
-p 5000:5000 devdeploy-backend
```

---

### 4. Run frontend

```bash
docker run -d --name dev-frontend --network stackpilot-net \
-e VITE_API_URL=http://dev-backend:5000 \
-p 5173:5173 devdeploy-frontend
```

---

## 📚 What I learned

* How Docker containers work
* How services connect using networks
* Difference between `docker run` and `docker-compose`
* How frontend, backend, and DB interact

---

## 🔥 Future improvements

* Real build execution (not simulated)
* Deploy on AWS
* Add authentication

---

## 👨‍💻 Author

Prabool Bharti
Learning DevOps 🚀
