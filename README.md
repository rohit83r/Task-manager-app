
# 📖 Task Management Application

## Demo Video 
[](https://drive.google.com/file/d/1jDWCzr5AW7FxwUXIU97SzPpn0v50kQLr/view?usp=drive_link)

## 🐳 Run using Docker

### Fork this repo

###  Setup Environment Variables

Create a `.env` file in the project root:

```
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret"
VITE_API_BASE_URL=http://localhost:3000/api
```

---



Build & Start All Services

At project root:

```bash

docker-compose up --build
```

This will:
- Build and start React frontend
- Build and start Express.js backend
- Start a PostgreSQL container

Access the application at [http://localhost:5173/](http://localhost:5173/)

Swagger API docs: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 📖 Overview

This is a **Task Management Application** built with a modern full-stack setup. It supports:
- **User Authentication** using JWT
- **CRUD operations for Tasks**
- Fully **Dockerized deployment** with a PostgreSQL database
- Clean **API documentation via Swagger**

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Redux Toolkit
- Axios

**Backend**
- Express.js (TypeScript)
- Prisma ORM
- JWT Authentication
- Swagger for API Docs

**Database**
- PostgreSQL

**DevOps**
- Docker
- Docker Compose

---





## 📘 API Endpoints Documentation

Swagger Documentation available at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Authentication:
- `POST /api/auth/login`: Authenticate the user and return a JWT token.
- `POST /api/auth/register`: Create a new user.

### Tasks:
- `GET /api/tasks`: Fetch tasks for the logged-in user.
- `POST /api/tasks`: Create a new task.
- `PUT /api/tasks/{id}`: Update an existing task.
- `DELETE /api/tasks/{id}`: Delete a task.

---
## 📝 Notes

- The app uses JWT Authentication, stored on frontend via `localStorage`
- API secured via `Authorization: Bearer <token>` header
- Docker Compose orchestrates frontend, backend, and database for seamless deployment
