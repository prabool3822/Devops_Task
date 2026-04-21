# 🚀 CI/CD Implementation – Portfolio App (DevOps Task)

This document explains the CI/CD pipeline implemented for the **Portfolio App** using **GitHub Actions and a Self-Hosted Runner on AWS EC2**.

---

## 🎯 Objective

To automate deployment such that:

* Code push triggers deployment automatically
* No manual SSH or deployment steps required
* Application updates instantly on EC2

---

## 🏗️ Architecture Overview

```text
Developer → GitHub → GitHub Actions → Self-Hosted Runner (EC2)
                                           ↓
                                   Docker Compose
                                           ↓
                                Running Containers
```

---

## ⚙️ Tools & Technologies

* GitHub Actions (CI/CD)
* Self-Hosted Runner (EC2)
* Docker & Docker Compose
* Nginx (Reverse Proxy)
* Node.js (Backend)

---

## 🔁 CI/CD Workflow

### 📌 Trigger

Pipeline runs on:

```yaml
on:
  push:
    branches:
      - main
```

---

### 📌 Workflow File Location

```text
.github/workflows/deploy.yml
```

---

### 📌 Workflow Content

```yaml
name: Simple CI CD

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: self-hosted

    steps:
      - name: Deploy using Docker
        run: |
          cd /home/ubuntu/Projects/portfolio-app
          docker compose down
          docker compose up -d --build
```

---

## 🖥️ Self-Hosted Runner Setup

### Step 1: Create Runner

* GitHub → Repository → Settings → Actions → Runners
* Click **New Self-Hosted Runner**

---

### Step 2: Install Runner on EC2

Commands provided by GitHub were executed inside:

```bash
/home/ubuntu/Projects/
```

---

### Step 3: Run Runner

```bash
./run.sh
```

---

### Step 4: Run as Service (Auto Start)

```bash
sudo ./svc.sh install
sudo ./svc.sh start
```

---

## 🐳 Deployment Logic

```bash
docker compose down
docker compose up -d --build
```

### What Happens:

* Stops existing containers
* Rebuilds images with updated code
* Starts new containers
* Deploys latest version automatically

---

## 🌐 Application Flow

```text
User → EC2 (Port 80)
       ↓
   Nginx (Frontend)
       ↓
   /api → Backend (Node.js)
```

---

## 🔐 Best Practices Used

* Backend not exposed publicly
* Internal Docker networking
* Restart policies (`unless-stopped`)
* Health checks for backend
* Volume persistence for data

---

## ⚠️ Challenges Faced

| Issue                  | Solution                            |
| ---------------------- | ----------------------------------- |
| Runner not triggering  | Verified branch & workflow location |
| Changes not reflecting | Used `--build` flag                 |
| Backend not reachable  | Fixed Docker network                |
| Manual deployment      | Automated via CI/CD                 |

---

## 🧠 Key Learnings

* CI/CD pipeline using GitHub Actions
* Difference between hosted vs self-hosted runners
* Docker-based deployments
* Real-world DevOps workflow

---

## 🚀 Future Improvements

* Add HTTPS (SSL using Certbot)
* Add custom domain
* Add staging environment
* Add monitoring (Prometheus + Grafana)

---

## 📌 Conclusion

This implementation demonstrates a **production-style CI/CD pipeline** where:

✔ Code push triggers deployment
✔ Infrastructure updates automatically
✔ Application runs in containers
✔ Deployment is fully automated

---
