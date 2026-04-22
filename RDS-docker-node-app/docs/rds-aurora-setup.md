# 📘 AWS Aurora RDS + Docker EC2 Lab Notes

## 🟢 RDS Aurora Configuration

### Database Creation Steps:

* Engine Type: Aurora (MySQL Compatible)
* Template: Dev/Test
* Cluster Type: Provisioned
* Instance Class: db.t3.small

### Engine Configuration:

* Version: Aurora MySQL 5.7 (2.11.1)
* Extended Support: Enabled

### Credentials:

* Master Username: admin
* Authentication: Password-based

---

## 🟡 Storage & Availability

* Storage: Aurora Standard
* No Read Replica created

---

## 🔵 Networking Configuration

* VPC: New VPC created
* Subnet Group: New
* Public Access: Enabled
* Network Type: IPv4

---

## 🔐 Security Groups

### RDS Security Group:

* Protocol: MySQL/Aurora
* Port: 3306
* Source: 0.0.0.0/0 (for testing only)

---

## 📊 Monitoring

* Performance Insights: Enabled
* Retention: 7 Days
* KMS Key: Default

---

## 🟠 EC2 + Docker Setup

### Install Docker:

```bash
sudo apt update
sudo apt install docker.io -y
```

### Pull Image:

```bash
docker pull philippaul/node-mysql-app:02
```

---

## 🔗 Connecting App to RDS

### Run Container:

```bash
docker run --rm -p 80:3000 \
-e DB_HOST="database-1.cluster-xxxx.ap-south-1.rds.amazonaws.com" \
-e DB_USER="admin" \
-e DB_PASSWORD="your_password" \
-d philippaul/node-mysql-app:02
```

---

## 🧪 Database Verification

```bash
docker run -it --rm mysql:8.0 \
mysql -h database-1.cluster-xxxx.ap-south-1.rds.amazonaws.com \
-u admin -p
```

---

## 📌 Key Observations

* Docker container successfully connects to external AWS RDS
* Security group rules control access
* Public RDS makes testing easier but is not secure

---

## 🚨 Best Practices

* Use private RDS (no public access)
* Connect via Bastion Host or EC2
* Store credentials securely
* Enable backups and Multi-AZ

---
