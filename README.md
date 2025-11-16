# 🎓 Result Management System

## 🧾 Introduction
The **Result Management System** is a full-stack web application designed to simplify how educational institutes manage student results.  
It automates the process of entering, updating, viewing, and publishing results while ensuring accuracy, transparency, and secure access.

The system follows a **Three-Tier Architecture**:
- **Frontend:** Angular  
- **Backend:** Spring Boot  
- **Database:** MySQL  

This structure ensures scalability, high performance, and secure communication between components.

---

## 🎯 Objectives
- Store and manage student records and academic results  
- Provide separate dashboards for admin and students  
- Automate result generation and reduce manual errors  
- Allow students to securely access their results online  
- Maintain accurate academic data with proper validations  

---

## 🧩 Features
### 👨‍🏫 Admin Features
- Add / Update / Delete Students  
- Add / Update / Delete Subjects  
- Enter Marks & Generate Results  
- Publish / Unpublish Results  
- Manage academic data through a secure dashboard  

### 👨‍🎓 Student Features
- Login with credentials  
- View semester-wise results  
- Download marksheet (PDF)  
- View overall CGPA / Percentage  

### 🔐 Security Features
- JWT-based authentication  
- Role-based access (Admin / Student)  
- Protected APIs  

---

## 🏗️ System Architecture

Angular (Frontend)
|
Spring Boot (Backend REST APIs)
|
MySQL (Database)


---

## ⚙️ Tech Stack

| Layer | Technology Used |
|-------|------------------|
| **Frontend** | Angular, TypeScript, HTML, CSS |
| **Backend** | Spring Boot, Java |
| **Database** | MySQL |
| **Security** | Spring Security, JWT |
| **Build Tools** | Maven, npm |
| **Version Control** | Git & GitHub |

---

## 🔗 API Endpoints (Sample)

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/auth/login` | User login (admin/student) |
| `POST` | `/api/students` | Add new student |
| `GET` | `/api/students/{id}` | Get student details |
| `POST` | `/api/results` | Save marks & generate result |
| `GET` | `/api/results/{studentId}` | Get student result |

---

## 🛠️ How It Works
1. Admin logs into the system  
2. Admin adds students, subjects, and enters marks  
3. Backend processes and stores result in database  
4. Student logs in and views results  
5. Admin can publish/unpublish results anytime  

---

## 🚀 Setup Instructions

### 🖥️ Backend (Spring Boot)
```bash
cd Result-Management-Backend
mvn clean install
mvn spring-boot:run

Runs at: http://localhost:8080

🌐 Frontend (Angular)
cd Result-Management-Frontend
npm install
ng serve

🗄️ Database Configuration
Create a MySQL database:
CREATE DATABASE result_db;

Update application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/result_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update


