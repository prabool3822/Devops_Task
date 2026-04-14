# 🛠️ Implementation Steps: Duo 2FA on Windows EC2

## Step 1: Launch Windows EC2

* Create EC2 instance with Windows AMI
* Download key pair
* Decrypt Administrator password

---

## Step 2: Connect via RDP

* Use Remote Desktop client
* Login using Administrator credentials

---

## Step 3: Create Non-Admin User

* Open Computer Management
* Create new user
* Add user to **Remote Desktop Users** group

---

## Step 4: Login as New User

* Use "Other User" option in RDP
* Enter new credentials

---

## Step 5: Setup Duo Account

* Create account on Duo
* Add users (Admin + RDP user)
* Send enrollment email
* Register device using Duo Mobile

---

## Step 6: Configure Duo Application

* Create application: Microsoft RDP
* Enable access for all users
* Username normalization: Simple

---

## Step 7: Install Duo for Windows Logon

* Download Duo installer
* Enter:

  * API Hostname
  * Integration Key
  * Secret Key
* Enable bypass option
* Complete installation

---

## Step 8: Test Authentication

* Login via RDP
* Enter credentials
* Approve Duo push notification
* Access granted
