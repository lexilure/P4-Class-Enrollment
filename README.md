# DLSU Class Enrollment System

## Overview
A web-based class enrollment system for De La Salle University students and faculty. The system enables students to manage their course enrollments and view grades, while faculty members can upload and manage student grades.

## Features

### Student Portal
- View available courses and sections
- Enroll in classes for current term
- View grade history

### Faculty Portal
- Upload student grades
- Manage class lists
- View teaching schedule
- Download class records

## Tech Stack
### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Live Server (for local development)

### Backend
- Java 17+
- Spring Boot
- MongoDB Atlas
- JWT (JSON Web Tokens) for authentication
- Maven

## Setup Instructions

### Frontend
1. Open the `frontend/` folder in **VS Code**.
2. Make sure the **Live Server** extension is installed.
3. Right-click `index.html` and select **"Open with Live Server"**.
4. Login with test credentials to access the system.

### Backend

1. Open the `backend/` folder in your IDE (VS Code, IntelliJ, etc).
2. In `application.properties`, configure your MongoDB URI:

`spring.data.mongodb.uri=mongodb+srv://harold:abcd1234@cluster0.mf5oubl.mongodb.net/enrollmentDB?retryWrites=true&w=majority`

3. Open a terminal and navigate to the `backend/` folder.
4. Run the following to build and start the server:

`./mvnw clean install`
`./mvnw spring-boot:run`

5. The backend will run at: http://localhost:8080

## Project Structure

```project-folder/
├── backend/
│   ├── src/
│   │   └── com/
│   │       └── dlsu/
│   │           └── enrollment/
│   │               ├── config/
│   │               │   └── SecurityConfig.java
│   │               ├── controller/
│   │               │   ├── AuthController.java
│   │               │   ├── CourseController.java
│   │               │   ├── EnrollmentController.java
│   │               │   ├── GradeController.java
│   │               │   └── UploadController.java
│   │               ├── model/
│   │               │   ├── Course.java
│   │               │   ├── Enrollment.java
│   │               │   ├── Grade.java
│   │               │   ├── JwtResponse.java
│   │               │   ├── LoginRequest.java
│   │               │   └── User.java
│   │               ├── repository/
│   │               │   ├── CourseRepository.java
│   │               │   ├── EnrollmentRepository.java
│   │               │   ├── GradeRepository.java
│   │               │   └── UserRepository.java
│   │               ├── security/
│   │               │   ├── JwtRequestFilter.java
│   │               │   └── JwtUtil.java
│   │               └── EnrollmentSystemApplication.java
├── pom.xml
├── application.properties
└── frontend/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── login.js
    │   ├── home.js
    │   ├── grades.js
    │   ├── enrollment.js
    │   ├── schedule.js
    │   └── upload.js
    ├── pages/
    │   ├── home.html
    │   ├── courses.html
    │   ├── enrollment.html
    │   ├── grades.html
    │   ├── upload.html
    │   └── schedule.html
    ├── index.html```