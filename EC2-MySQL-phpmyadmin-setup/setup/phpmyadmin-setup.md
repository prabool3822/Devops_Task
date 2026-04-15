
---

# 📄 2. `setup/phpmyadmin-setup.md`

```md
# 🌐 phpMyAdmin Setup on EC2

## 📌 Step 1: Install phpMyAdmin

```bash
sudo apt update
sudo apt install apache2 php php-mysql libapache2-mod-php phpmyadmin -y

# ⚠️ IMPORTANT

During installation:
Configure database for phpmyadmin with dbconfig-common?

👉 Select:
NO ❌


# 🔧 Step 2: Enable phpMyAdmin in Apache

sudo ln -s /etc/phpmyadmin/apache.conf /etc/apache2/conf-enabled/phpmyadmin.conf
sudo systemctl restart apache2


# ⚙️ Step 3: Configure Remote MySQL

Edit config:

sudo nano /etc/phpmyadmin/config.inc.php

Add at the end:

$i++;

$cfg['Servers'][$i]['auth_type'] = 'cookie';
$cfg['Servers'][$i]['host'] = 'YOUR_MYSQL_PRIVATE_DNS';
$cfg['Servers'][$i]['connect_type'] = 'tcp';
$cfg['Servers'][$i]['port'] = '3306';
$cfg['Servers'][$i]['AllowNoPassword'] = false;
$cfg['Servers'][$i]['verbose'] = 'Remote MySQL EC2';


# 🔁 Step 4: Restart Apache
sudo systemctl restart apache2


# 🌐 Step 5: Access phpMyAdmin
http://YOUR-PHPMYADMIN-EC2-PUBLIC-IP/phpmyadmin


# 🔐 Step 6: Login
Username: myuser
Password: MyStrongPass@123

# ✅ Result
phpMyAdmin UI is accessible
Connected to remote MySQL server