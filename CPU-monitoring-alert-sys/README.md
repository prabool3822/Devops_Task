# 🚀 EC2 CPU Monitoring & Alert System 🚨
📌 OVERVIEW

This project is a simple DevOps automation system that monitors CPU usage on an AWS EC2 instance and sends email alerts when CPU usage goes above a defined threshold.

It also includes 🧪 CPU load testing using the stress tool to validate the monitoring system.

# 🛠️ TECH STACK

 AWS EC2 (Ubuntu)
 Bash Scripting
 Cron Jobs
 Sysstat (mpstat)
 Mailutils + postfix (SMTP email system)
 stress tool (CPU load generator)

# PROJECT FLOW

🖥️ EC2 Instance

        ⬇️
        
⏱️ Cron Job (runs every 1 minute)
       
        ⬇️
        
📜 Bash Script (CPU Monitoring)
        
        ⬇️
        
📊 CPU Usage Check
        
        ⬇️
        
📧 Email Alert (if CPU > threshold)

# FEATURES

⚡ Real-time CPU monitoring

⏱️ Automated execution using cron (every 1 min)

📧 Email alerts for high CPU usage

🔥 CPU stress testing using stress tool

🧾 Logging for debugging issues

# ⚙️ INSTALLATION

 Install required packages:
 
sudo apt update

sudo apt install sysstat mailutils postfix bc stress cron -y

# ⏱️ CRON SETUP

Open cron editor:

crontab -e

Add this line:

* * * * * /bin/bash /home/ubuntu/Devops_task/scripts/cpu_monitor.sh


# 📊 CPU STRESS TESTING

Install stress tool:
sudo apt install stress -y

Run CPU load test:
stress --cpu 2 --timeout 60


# ⚙️ HOW IT WORKS

1️⃣ Cron triggers script every minute

2️⃣ Script reads CPU usage using mpstat

3️⃣ CPU value is compared with threshold (50%)

4️⃣ If CPU is high → 📧 email alert is sent

5️⃣ Logs are stored for debugging


# 🧪 TESTING SCENARIO

✔ Normal state → No email

🔥 High load (stress tool) → Email alert triggered

📊 Logs updated in real time


# 📚 KEY LEARNINGS

🧠 Linux system monitoring

🕒 Cron automation

🐚 Bash scripting

📧 SMTP email setup

🔥 Performance testing using stress tool

🛠️ Debugging real-world Linux issues
