# Notes - EC2 CPU Monitoring Project

## 1. Objective
To monitor CPU usage on an EC2 instance and send email alerts when CPU usage crosses a defined threshold.

---

## 2. Main Components

### CPU Monitoring Script
- Uses `mpstat` from sysstat package
- Calculates CPU usage percentage
- Stores logs in a file

### Cron Job
- Runs script automatically every 1 minute
- Ensures continuous monitoring

### Email Alert System
- Uses `mailutils` and `postfix`
- Sends email when CPU > threshold

### Stress Tool
- Used to generate CPU load
- Helps in testing alert system

---

## 3. Important Commands

### Install packages
```bash
sudo apt install sysstat mailutils postfix bc stress cron -y
