#!/bin/bash

# ==============================

# 🚀 Node App Deployment Script

# EC2 + Docker

# ==============================

echo "====================================="
echo " 🚀 Node.js Docker Deployment Started"
echo "====================================="

# ===== SYSTEM SETUP =====

echo "Updating system..."
sudo apt update -y

echo "Installing Docker..."
sudo apt install docker.io -y

echo "Starting Docker..."
sudo systemctl start docker
sudo systemctl enable docker

# ===== PULL IMAGE =====

echo "Pulling Node.js App Image..."
sudo docker pull philippaul/node-mysql-app:02

# ===== REMOVE OLD CONTAINER IF EXISTS =====

if [ "$(sudo docker ps -aq -f name=node-mysql-app)" ]; then
echo "⚠️ Existing container found. Removing..."
sudo docker rm -f node-mysql-app
fi

# ===== RUN CONTAINER (WITHOUT DB) =====

echo "Running Container..."

sudo docker run -d 
--name node-mysql-app 
-p 80:3000 
philippaul/node-mysql-app:02

# ===== FINAL MESSAGE =====

echo ""
echo "====================================="
echo "✅ App Deployment Complete!"
echo "🌐 Access your app: http://<EC2-PUBLIC-IP>"
echo "====================================="

echo ""
echo "📌 NEXT STEP: CONNECT TO AWS RDS DATABASE"
echo "-------------------------------------"
echo "1. Create an Aurora (MySQL) RDS instance"
echo "2. Copy your DB endpoint"
echo "3. Stop and remove current container:"
echo "   docker rm -f node-mysql-app"
echo ""
echo "4. Run container with DB connection:"
echo ""
echo "docker run -d \"
echo "  --name node-mysql-app \"
echo "  -p 80:3000 \"
echo "  -e DB_HOST=<your-rds-endpoint> \"
echo "  -e DB_USER=admin \"
echo "  -e DB_PASSWORD=<your-password> \"
echo "  philippaul/node-mysql-app:02"
echo ""
echo "5. Ensure RDS Security Group allows port 3306 from EC2"
echo ""
echo "🎯 After this, your app will store and fetch data from RDS!"
echo "====================================="
