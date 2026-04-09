# AWS CLI Configuration Guide (Windows)

## 1. Install AWS CLI

Download from:
https://aws.amazon.com/cli/

Verify installation:

aws --version


---

## 2. Create IAM Access Keys

Go to AWS Console → IAM → Users → Your user → Security Credentials → Create Access Key

---

## 3. Configure AWS CLI

Run:

aws configure

Enter:

- AWS Access Key ID
- AWS Secret Access Key
- Default region: ap-south-1
- Output format: json

---

## 4. Verify Configuration

aws sts get-caller-identity


---

## 5. Install Session Manager Plugin

Download from AWS documentation.

Verify:

session-manager-plugin


---

## 6. Start SSM Session

aws ssm start-session --target <INSTANCE-ID>