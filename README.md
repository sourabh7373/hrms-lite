# HRMS Lite

A lightweight Human Resource Management System (HRMS Lite) to manage employees and track attendance. Built as a full-stack web application using **React (Vite)** for frontend and **FastAPI** for backend with **SQLite** database.  

---

## 🔹 Tech Stack

- **Frontend:** React + Vite  
- **Backend:** FastAPI  
- **Database:** SQLite  
- **Deployment:**  
  - Backend: Render  
  - Frontend: Vercel  

---

## 🔹 Features

1. **Employee Management**
   - Add new employees with Employee ID, Full Name, Email, Department
   - View all employees
   - Delete employees

2. **Attendance Management**
   - Mark attendance (Present / Absent) for each employee
   - Only one attendance record per employee per date (new marks overwrite previous)
   - View attendance records per employee

3. **UI / UX**
   - Clean, professional layout
   - Loading states, empty states, error handling
   - Reusable components

---

## 🔹 Live URLs

- **Frontend:** [https://frontend-cs4rigsfk-sourabh-jains-projects-a4fc2f6c.vercel.app/]
- **Backend API:** [https://hrms-lite-onui.onrender.com/employees] 


---

## 🔹 Local Setup

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload


Backend will run at: http://127.0.0.1:8000

API endpoints:

GET /employees → List employees

POST /employees → Add employee

DELETE /employees/{employee_id} → Delete employee

POST /attendance → Mark attendance

GET /attendance → Get all attendance

GET /attendance/{employee_id} → Get attendance per employee

Frontend
cd frontend
npm install
npm run dev


Frontend will run at: http://localhost:5173 (Vite default)

