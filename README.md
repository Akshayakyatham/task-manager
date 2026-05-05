# 📌 Team Task Manager (Full-Stack)

## 🚀 Project Overview
This is a full-stack web application that allows users to create, assign, and manage tasks with role-based access (Admin & Member).

---

## 🎯 Features

### 🔐 Authentication
- User Signup & Login
- Role-based access (Admin / Member)

### 👥 Role-Based System
- Admin → Assign tasks, approve tasks
- Member → View tasks, submit tasks

### 📋 Task Management
- Create and assign tasks
- Track task status:
  - Pending → Submitted → Done
- File upload & submission support

### 📊 Dashboard
- Total tasks
- Completed tasks
- Pending tasks

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Flask (Python)
- REST APIs

### Database
- MongoDB Atlas (NoSQL)

### Deployment
- Backend: Railway (Primary Requirement)
- Alternative Backend: Render
- Frontend: Vercel

---

## 🔗 Live URLs

### 🌐 Frontend (Vercel)
👉 https://task-manager-kohl-chi.vercel.app/

### ⚙️ Backend (Working - Render)
👉 https://task-manager-xila.onrender.com

### 🚆 Backend (Railway - Required)
👉 https://web-production-99447b.up.railway.app *(Deployment successful, but domain DNS issue)*

---

## 📂 GitHub Repository

👉 https://github.com/Akshayakyatham/task-manager

---

## ⚙️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|------------|
| POST   | /register | Register user |
| POST   | /login | Login user |
| GET    | /users | Get all users |
| POST   | /tasks | Create task |
| GET    | /tasks | Get tasks |
| PUT    | /tasks/:id | Update task status |
| GET    | /dashboard | Get dashboard stats |

---

## 🧠 System Architecture

Frontend (Vercel)  
↓  
Flask Backend (Railway / Render)  
↓  
MongoDB Atlas  

---

## ⚠️ Railway Deployment Note

The application was successfully deployed on Railway and the container is running correctly.

However, the Railway public domain is not resolving due to a DNS routing issue.

Evidence:
- Deployment logs show app running on `0.0.0.0`
- No HTTP requests reaching service
- Domain returns `DNS_PROBE_FINISHED_NXDOMAIN`

👉 To ensure functionality, a working deployment is provided using Render.

---

## 📦 How to Run Locally

```bash
git clone https://github.com/Akshayakyatham/task-manager.git
cd task-manager
pip install -r requirements.txt
python app.py
