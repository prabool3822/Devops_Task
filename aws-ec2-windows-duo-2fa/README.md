# 🔐 AWS EC2 Windows RDP Login with Duo 2FA

## 📌 Overview

This project demonstrates how to secure a Windows-based AWS EC2 instance using **Duo Multi-Factor Authentication (2FA)** for Remote Desktop Protocol (RDP) login.

The implementation integrates Duo at the **Windows logon level**, ensuring that users must approve a push notification before gaining access.

---

## 🧩 Architecture Diagram

![Architecture](architecture/duo-2fa-architecture.png)

---

## 🔐 Authentication Flow

1. User initiates RDP connection from laptop
2. Windows login screen appears
3. User enters username and password
4. Duo Authentication for Windows Logon is triggered
5. EC2 communicates with Duo Cloud
6. Duo sends push notification to user's device
7. User approves request in Duo Mobile app
8. Duo verifies authentication
9. User is granted access to Windows desktop

---

## 📸 Screenshots

| Step          | Screenshot                               |
| ------------- | ---------------------------------------- |
| EC2 Instance  | ![](screenshots/01-ec2-instance.png)     |
| RDP Login     | ![](screenshots/02-rdp-login.png)        |
| User Creation | ![](screenshots/03-user-creation.png)    |
| Duo Dashboard | ![](screenshots/04-duo-dashboard.png)    |
| Enrollment    | ![](screenshots/05-duo-enrollment.png)   |
| Duo RDP App   | ![](screenshots/06-duo-rdp-app.png)      |
| Installation  | ![](screenshots/07-duo-installation.png) |
| Duo Prompt    | ![](screenshots/08-duo-prompt.png)       |
| Login Success | ![](screenshots/09-login-success.png)    |

---

## ⚙️ Implementation Details

Detailed step-by-step guide is available here:

📄 [Implementation Guide](docs/implementation-steps.md)

---

## 🧠 Key Concepts

* OS-level authentication using Duo
* Push-based multi-factor authentication
* Secure remote access to cloud instances
* Identity-based security over network-based security

---

## 🔐 Security Benefits

* Prevents unauthorized RDP access
* Adds second layer of authentication
* Protects against credential compromise
* Demonstrates real-world IAM security integration

---
sing IAM / SSM
* Add logging and monitoring
* Integrate with centralized identity provider

---

## 🚀 Future Improvements

* Restrict RDP access u
## 👨‍💻 Author

Prabool Bharti
