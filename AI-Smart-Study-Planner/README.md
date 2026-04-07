# 🚀 AI Smart Study Planner

A web application that helps students plan and manage their study schedule efficiently.
The app allows users to organize subjects, track sessions, and generate structured study plans.

---

## ✨ Features

* 📅 Create and manage study plans
* 📚 Add courses and track progress
* ⏱️ Manage study sessions
* 📊 Simple dashboard for overview
* 🔐 Authentication using Supabase

---

## 🛠 Tech Stack

* **Frontend:** React + TypeScript (Vite)
* **Backend:** Supabase (Auth + Database)
* **Styling:** Tailwind CSS
* **Deployment:** Docker + Nginx

---

## 🐳 Running with Docker

Build and run the application using Docker:

```bash
docker compose up --build
```

App will be available at:
http://localhost:3000

---

## 💻 Running Locally (Without Docker)

```bash
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_URL=https://your-project.supabase.co
```

---

## 📁 Project Structure

```
src/
 ├── components/
 ├── pages/
 ├── hooks/
 ├── lib/
```

---

## 🚀 Future Improvements

* Better analytics dashboard
* Study streak tracking
* Notifications/reminders
* Mobile responsiveness improvements

---

## 📌 Notes

* This project uses Supabase as a backend service
* Environment variables are not included in the repository for security

---

## 👤 Author

Prabool Bharti
GitHub: https://github.com/prabool3822/Devops_Task
