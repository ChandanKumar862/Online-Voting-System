# 🗳️ Online Voting System

An **Online Voting System** is a web-based application that allows registered users to securely participate in elections through an online platform. The system provides separate functionalities for voters and administrators, making the election process easier to manage, transparent, and efficient.

## 🚀 Features

### 👤 Voter

* User registration and login
* Secure voter authentication
* View available elections
* View candidate details
* Cast vote online
* Prevent multiple voting
* View election results after voting

### 🔐 Admin

* Admin authentication
* Create and manage elections
* Add, update, and remove candidates
* Manage registered voters
* Monitor voting activity
* Publish election results

### 📊 Results

* Automatic vote counting
* Candidate-wise vote statistics
* Display election results
* Winner identification

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js
* REST APIs
* CORS

### Database

* Supabase / PostgreSQL

### Other Technologies

* JWT for authentication
* bcrypt for password hashing
* Git & GitHub

---

## 📁 Project Structure

```text
Online-Voting-System/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Online-Voting-System
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

### 3. Setup Backend

Open another terminal:

```bash
cd backend
npm install
npm run dev
```

The backend will normally run at:

```text
http://localhost:5000
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5000

SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

JWT_SECRET=your_jwt_secret
```

**Never commit your `.env` file to GitHub.**

Add it to `.gitignore`:

```text
.env
node_modules/
```

---

## 🔄 Application Flow

```text
                ┌─────────────────┐
                │      Voter      │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │     Frontend    │
                │ React + Vite    │
                └────────┬────────┘
                         │
                     REST API
                         │
                         ▼
                ┌─────────────────┐
                │     Backend     │
                │ Node + Express  │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │    Supabase     │
                │   PostgreSQL    │
                └─────────────────┘
```

---

## 🔒 Security

The system is designed with security in mind:

* Passwords are securely hashed using bcrypt.
* JWT-based authentication is used for protected routes.
* CORS is configured between frontend and backend.
* Users can cast only one vote per election.
* Admin-only operations are protected.
* Sensitive environment variables are stored in `.env`.

> **Note:** This project is intended for educational and demonstration purposes and should not be treated as a production-grade election system without independent security auditing, privacy review, and appropriate election controls.

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint             | Description      |
| ------ | -------------------- | ---------------- |
| POST   | `/api/auth/register` | Register a voter |
| POST   | `/api/auth/login`    | Login user       |
| POST   | `/api/auth/logout`   | Logout user      |

### Elections

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| GET    | `/api/elections`     | Get all elections    |
| GET    | `/api/elections/:id` | Get election details |
| POST   | `/api/elections`     | Create election      |
| PUT    | `/api/elections/:id` | Update election      |
| DELETE | `/api/elections/:id` | Delete election      |

### Candidates

| Method | Endpoint                      | Description      |
| ------ | ----------------------------- | ---------------- |
| GET    | `/api/candidates/:electionId` | Get candidates   |
| POST   | `/api/candidates`             | Add candidate    |
| PUT    | `/api/candidates/:id`         | Update candidate |
| DELETE | `/api/candidates/:id`         | Delete candidate |

### Voting

| Method | Endpoint                   | Description          |
| ------ | -------------------------- | -------------------- |
| POST   | `/api/votes`               | Cast a vote          |
| GET    | `/api/results/:electionId` | Get election results |

---

## 🎯 Future Improvements

* Email/OTP-based voter verification
* Two-factor authentication
* Improved admin dashboard
* Real-time election statistics
* Election audit logs
* Candidate search and filtering
* Mobile-responsive improvements
* Stronger privacy and security controls

---

## 👨‍💻 Author

**Chadan Dev**

Computer Science Student
IIIT Pune

---

## ⭐ Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Create a Pull Request

---

## 📄 License

This project is developed for educational purposes.
