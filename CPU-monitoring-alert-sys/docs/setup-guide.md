# Setup Guide

## Install Required Packages
```bash

sudo apt update
sudo apt install sysstat mailutils postfix bc stress cron -yConfigure Postfix

# During setup:

Choose: Internet Site
SMTP: smtp.gmail.com:587

# Enable Cron

sudo systemctl enable cron
sudo systemctl start cron
Add Cron Job
crontab -e

# Add:

* * * * * /bin/bash /home/ubuntu/Devops_task/scripts/cpu_monitor.sh

# Gmail Setup :

Enable 2FA
Generate App Password
Use it in postfix/email config

## CPU Monitoring

- Uses mpstat to calculate CPU usage
- Logs stored in logs/cpu.log

## Alert Logic

If CPU > 50% → email sent

## Testing

Used stress tool:
stress --cpu 2 --timeout 60
Cron Runs every 1 minute automatically

# Key Learnings

Linux monitoring
Automation using cron
SMTP email setup
CPU load testing
