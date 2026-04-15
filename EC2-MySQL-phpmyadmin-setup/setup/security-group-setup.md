
---

# 📄 3. `setup/security-group-setup.md`

```md
# 🔐 Security Group Setup (AWS EC2)

## 📌 Overview

Security Groups act as a firewall controlling traffic between EC2 instances.

---

## 🧱 Step 1: Create Security Groups

### phpMyAdmin Security Group

| Type | Port | Source |
|------|------|--------|
| HTTP | 80   | 0.0.0.0/0 |
| SSH  | 22   | Your IP |

---

### MySQL Security Group

| Type | Port | Source |
|------|------|--------|
| MySQL | 3306 | phpmyadmin-sg |

---

## 🔗 Step 2: Attach Security Groups

### phpMyAdmin EC2
Attach:
phpmyadmin-sg


### MySQL EC2
Attach:
mysql-sg


---

## 🔥 Key Concept

Instead of using IP addresses, we use:

```text
Security Group 

## 👉 This ensures:

Secure communication
No dependency on changing IPs
Best AWS practice


## ⚠️ Important Notes

❌ Do NOT use:

0.0.0.0/0 for MySQL
Public IP for DB access

## ✔ Always use:

Security Group reference


## ✅ Result
Only phpMyAdmin EC2 can access MySQL
Database is not exposed publicly