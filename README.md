# 🌀 Feedloop – Feedback Management System

Feedloop is a **full-stack feedback management tool** inspired by Stack Overflow.
It allows users to share ideas, upvote/downvote feedback, comment in threaded discussions, and help product teams collect and prioritize insights efficiently.

---

## 🚀 Tech Stack

| Layer            | Technology              |
| :--------------- | :---------------------- |
| Frontend         | **Next.js**, TypeScript |
| Backend          | **Nest.js**, TypeScript |
| Database         | **PostgreSQL**          |
| ORM              | **TypeORM**             |
| Authentication   | JWT & Bcrypt            |
| Containerization | Docker                  |

---

## 📜 Features

### 👥 User Module

* **Register/Login** with unique username or email.
* **Add Feedback** with title, description, tags, and visibility (Public/Private).
* **Tag Management**: Choose existing tags or create new ones instantly.
* **Edit/Delete Feedback** anytime.
* **View History** of all feedbacks posted by the user.
* **Upvote/Downvote Feedback** (toggle behavior).
* **Comment & Reply** (nested thread structure using self-relations).
* **Highlight Own Comments** when viewing threads.
* **Filters** for Feedback:

  * Search by title/description
  * Multi-tag selection
  * Sort by score
  * Filter by author
  * Pagination and limit options

---

### 🏠 Public/Home Page

* View all **public feedbacks** with:

  * Author, Title, Description, Tags
  * Upvote/Downvote buttons with live score
  * “Add Comment” and “View Comments” options
* Non-logged users can browse feedbacks but must log in to interact.

---

### 🔧 Admin Module

* **Admin Login** with predefined credentials (seeded data).
* **View All Feedbacks and Comments**, including deleted ones.
* **Advanced Filters:**

  * Show/Hide deleted feedbacks
  * Show/Hide deleted comments
* **Manage Users:**

  * Disable login
  * Hide all feedbacks
  * Hide all comments
  * Undo restrictions anytime

---

## 🐳 Docker Setup

A `Dockerfile` and `docker-compose.yml` are included for easy deployment.

### Run the project with Docker

```bash
docker-compose up --build
```

This will start:

* Next.js frontend on port **3000**
* Nest.js backend on port **5000**
* PostgreSQL on port **5432**

---

## ⚙️ Local Development Setup

### 1️⃣ Clone the repository

### 2️⃣ Install dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3️⃣ Configure environment variables

Create `.env` files in both folders:

**Frontend (`frontend/.env`):**

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Backend (`backend/.env`):**

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=feedloop
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the app locally

```bash
# Backend
npm run start:dev

# Frontend
npm run dev
```

---

## 🧩 Folder Structure

```
feedloop/
│
├── backend/              # Nest.js API
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── feedback/
│   │   ├── comments/
│   │   └── admin/
│   └── main.ts
│
├── frontend/             # Next.js Client
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── utils/
│
├── docker-compose.yml
└── README.md
```

---

## 🧠 Key Highlights

* Self-referential comment structure (nested replies).
* Tag system with live creation and selection.
* JWT-based secure authentication.
* Admin-only controls and moderation.
* Modular codebase with TypeORM relations.
* Tested and deployable using Docker.
