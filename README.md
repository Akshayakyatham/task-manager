# 📌 Team Task Manager 

## 🌟 Key Highlight
A complete full-stack task management system with role-based access, file upload functionality, and cloud deployment.

---

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

### 📁 File Handling
- Admin uploads task files
- Members download and submit completed files

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

### ⚙️ Backend (Render - Working)
👉 https://task-manager-xila.onrender.com

### 🚆 Backend (Railway - Required)
👉 https://web-production-99447b.up.railway.app  
*(Deployment successful, but currently not accessible due to platform/network issue)*

---

## 🎥 Demo Video

👉 https://drive.google.com/file/d/1Wm7H2v3711rF0ySfXZ_6MoATWSIriOuQ/view?usp=drive_link

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

Client (Frontend - Vercel)  
↓  
Flask REST API (Backend - Railway / Render)  
↓  
MongoDB Atlas (Cloud Database)

---

## ⚠️ Railway Deployment Note

The application was successfully deployed on Railway and the backend service is running.

However, the public Railway domain is currently not accessible due to a platform-level networking issue.

To ensure full functionality and testing, an alternative deployment using Render has been provided.

---

## 📦 How to Run Locally

```bash
git clone https://github.com/Akshayakyatham/task-manager.git
cd task-manager
pip install -r requirements.txt
python app.py
