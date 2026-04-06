#!/bin/bash

CPU=$(mpstat 1 1 | awk '/Average/ {print 100 - $NF}')
THRESHOLD=50
EMAIL="yourmail@gmail.com"

echo "CPU=$CPU at $(date)" >> /home/ubuntu/Devops_task/logs/cpu.log

if (( $(echo "$CPU > $THRESHOLD" | bc -l) )); then
    echo "High CPU Usage: $CPU%" | mail -s "CPU ALERT" "$EMAIL"
fi
