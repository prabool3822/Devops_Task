# System Architecture - EC2 CPU Monitoring Project

              ┌──────────────────────┐
              │   AWS EC2 Instance    │
              │   (Ubuntu Server)     │
              └─────────┬────────────┘
                        │
                        │ runs every 1 min
                        ▼
              ┌──────────────────────┐
              │     Cron Job         │
              │ (Scheduled Task)     │
              └─────────┬────────────┘
                        │
                        ▼
              ┌──────────────────────┐
              │ Bash Monitoring Script│
              │ cpu_monitor.sh       │
              └─────────┬────────────┘
                        │
         ┌──────────────┴──────────────┐
         │                             │
         ▼                             ▼
┌──────────────────┐        ┌────────────────────┐
│ CPU Usage Check  │        │ Logging System     │
│ (mpstat)         │        │ cpu.log file       │
└─────────┬────────┘        └────────────────────┘
          │
          ▼
┌──────────────────────┐
│ Threshold Comparison │
│ (CPU > 50%)         │
└─────────┬────────────┘
          │
   YES    ▼
          ┌──────────────────────┐
          │ Email Alert System   │
          │ (postfix + mailutils)│
          └──────────────────────┘