# 🛢️ MySQL Setup on EC2

## 📌 Step 1: Install MySQL

```bash
sudo apt update
sudo apt install mysql-server -y
sudo systemctl enable mysql
sudo systemctl start mysql



# 🔐 Step 2: Set Root Password

sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Root@123';
FLUSH PRIVILEGES;
EXIT;


#🔑 Step 3: Login to MySQL

mysql -u root -p


# 🧱 Step 4: Create Database & User
CREATE DATABASE myappdb;

CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'MyStrongPass@123';

GRANT ALL PRIVILEGES ON myappdb.* TO 'myuser'@'localhost';

FLUSH PRIVILEGES;


# 📊 Step 5: Create Table & Insert Data

USE myappdb;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    course VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO students (name, email, course)
VALUES
('Prabool', 'prabool@example.com', 'CSE'),
('Mridul', 'mridul@example.com', 'DevOps');


# 🌐 Step 6: Enable Remote Access

Edit config:

sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

Change:

bind-address = 0.0.0.0

Restart:

sudo systemctl restart mysql



# 🔓 Step 7: Allow Remote User Access

CREATE USER 'myuser'@'%' IDENTIFIED BY 'MyStrongPass@123';

GRANT ALL PRIVILEGES ON myappdb.* TO 'myuser'@'%';

FLUSH PRIVILEGES;


# ✅ Result

MySQL is installed and running
Database created
Remote access enabled