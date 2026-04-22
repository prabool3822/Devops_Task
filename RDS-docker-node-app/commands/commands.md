# 📌 Post-Deployment Commands (Connect App to RDS)

After running `deployment-commands.sh`, your Node app is running **without database connection**.

Follow these steps to connect it to AWS Aurora RDS.

---

## 🔹 Step 1: Create RDS Aurora Database

* Engine: Aurora (MySQL Compatible)
* Enable Public Access (for testing)
* Note down:

  * **Endpoint**
  * **Username**
  * **Password**

---

## 🔹 Step 2: Update Security Group

Go to RDS → Security Group:

* Allow inbound rule:

  * **Type:** MySQL/Aurora
  * **Port:** 3306
  * **Source:** EC2 Security Group OR Anywhere (0.0.0.0/0 for testing)

---

## 🔹 Step 3: Stop Existing Container

```bash
docker rm -f node-mysql-app
```

---

## 🔹 Step 4: Run Container with DB Connection

```bash
docker run -d \
  --name node-mysql-app \
  -p 80:3000 \
  -e DB_HOST=<your-rds-endpoint> \
  -e DB_USER=admin \
  -e DB_PASSWORD=<your-password> \
  philippaul/node-mysql-app:02
```

---

## 🔹 Step 5: Verify Database Connection

```bash
docker run -it --rm mysql:8.0 \
mysql -h <your-rds-endpoint> -u admin -p
```

---

## 🔹 Step 6: Test Application

* Open browser:

```
http://<EC2-PUBLIC-IP>
```

* Add username → Click **Add**
* Click **Show All Contacts**

👉 Data should now be stored and fetched from RDS

---

## ✅ Expected Flow

User → EC2 (Docker App) → Aurora RDS (Writer DB)

---

## ⚠️ Notes

* Ensure EC2 can reach RDS (same VPC)
* Check port 3306 is open
* Replace placeholders with real values

---

## 🚀 Done!

Your app is now fully connected to AWS Aurora RDS 🎉
