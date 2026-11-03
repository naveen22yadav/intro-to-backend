# Intro to Backend Web Development – Node.js, Express & MongoDB

> Complete backend project implementation following the freeCodeCamp tutorial: [Intro to Backend Web Development – Node.js & Express Tutorial for Beginners](https://www.youtube.com/watch?v=KOutPbKc9UM).

---

## 📌 Project Overview

This repository contains the completed assignment for **Intro to Backend**. It implements a full-featured RESTful API backend using **Node.js**, **Express.js**, and **MongoDB Atlas** (via **Mongoose**), following the Model-View-Controller (MVC / Model-Route-Controller) architecture.

### ✨ What is covered:
1. **Node.js & Express Setup:** Modular ES Modules (`import/export`) structure with environment management via `dotenv`.
2. **MongoDB Atlas Database Integration:** Resilient connection handling using Mongoose with retry and error reporting.
3. **Mongoose Database Models:**
   - **User Model:** Schema validation, password hashing with `bcrypt` pre-save hooks, and custom comparison methods.
   - **Post Model:** Schema validation with `name`, `description`, and `age` fields with timestamps.
4. **Controllers & Routing (CRUD APIs):**
   - **User Authentication:** Registration (`/register`), Login (`/login`), and Logout (`/logout`).
   - **Post Management:** Create (`/create`), Read All (`/getPosts`), Update (`/update/:id`), and Delete (`/delete/:id`).
5. **Postman API Testing:** Pre-configured Postman Collection included in `postman/Intro_to_Backend.postman_collection.json`.

---

## 🗂️ Project Structure

```text
intro-to-backend/
├── .env.example                               # Sample environment variables
├── .gitignore                                 # Git ignore patterns (node_modules, .env, etc.)
├── package.json                               # Dependencies and npm scripts
├── README.md                                  # Documentation and run instructions
├── postman/
│   └── Intro_to_Backend.postman_collection.json # Exportable Postman collection
└── backend/
    └── src/
        ├── app.js                             # Express application configuration & middlewares
        ├── index.js                           # Entry point: DB connection & server initialization
        ├── config/
        │   ├── constants.js                   # Application-wide constants (DB name, etc.)
        │   └── database.js                    # Mongoose connection logic
        ├── controllers/
        │   ├── post.controller.js             # Post CRUD logic
        │   └── user.controller.js             # User auth (register, login, logout)
        ├── models/
        │   ├── post.model.js                  # Mongoose Post schema
        │   └── user.model.js                  # Mongoose User schema with bcrypt
        └── routes/
            ├── post.route.js                  # Post routing endpoints
            ├── post.routes.js                 # Alias export
            ├── user.route.js                  # User auth routing endpoints
            └── user.routes.js                 # Alias export
```

---

## ⚙️ Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- **MongoDB Atlas** account (or local MongoDB)
- **Postman Desktop** app (for API verification)

---

## 🚀 Step-by-Step Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/naveen22yadav/intro-to-backend.git
cd intro-to-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup MongoDB Atlas Account & Cluster
1. Navigate to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Build a **Free M0 Cluster**.
3. Under **Security > Database Access**, add a database user with read/write privileges (note the username & password).
4. Under **Security > Network Access**, click **Add IP Address** and select **Allow Access from Anywhere** (`0.0.0.0/0`) for local testing.
5. In **Database > Clusters**, click **Connect** > **Drivers** (Node.js) and copy your connection string:
   ```text
   mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/?retryWrites=true&w=majority
   ```

### 4. Configure Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```
Update `.env` with your port and MongoDB Atlas connection string:
```env
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/backend_tutorial?retryWrites=true&w=majority
```

### 5. Start the Server
- **Development Mode (with auto-reload via Nodemon):**
  ```bash
  npm run dev
  ```
- **Production Mode:**
  ```bash
  npm start
  ```

When running, you should see:
```text
MongoDB connected !!! Host: <cluster-host>
🚀 Server is running at http://localhost:4000
```

---

## 📡 API Endpoints & Documentation

Base URL: `http://localhost:4000`

### 1. Health Check
- **`GET /`**
  - **Description:** Verifies server is online.
  - **Response (200 OK):**
    ```json
    {
      "message": "Intro to Backend Web Development API is up and running!",
      "routes": {
        "users": "/api/v1/users",
        "posts": "/api/v1/posts"
      }
    }
    ```

---

### 2. User Authentication APIs

#### A. Register User
- **Method / URL:** `POST /api/v1/users/register`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "username": "naveenyadav",
    "email": "naveen@example.com",
    "password": "password123"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "User registered!",
    "user": {
      "id": "673f8e5b4...",
      "email": "naveen@example.com",
      "username": "naveenyadav"
    }
  }
  ```

#### B. Login User
- **Method / URL:** `POST /api/v1/users/login`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "naveen@example.com",
    "password": "password123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "User Logged in",
    "user": {
      "id": "673f8e5b4...",
      "email": "naveen@example.com",
      "username": "naveenyadav"
    }
  }
  ```

#### C. Logout User
- **Method / URL:** `POST /api/v1/users/logout`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "naveen@example.com"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Logout successful"
  }
  ```

---

### 3. Post CRUD APIs

#### A. Create Post
- **Method / URL:** `POST /api/v1/posts/create` (or `POST /api/v1/posts`)
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "First Backend Post",
    "description": "Learning Express and MongoDB step-by-step.",
    "age": 22
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "Post created successfully",
    "post": {
      "_id": "673f912c4...",
      "name": "First Backend Post",
      "description": "Learning Express and MongoDB step-by-step.",
      "age": 22,
      "createdAt": "2026-11-03T07:15:00.000Z",
      "updatedAt": "2026-11-03T07:15:00.000Z"
    }
  }
  ```

#### B. Get All Posts
- **Method / URL:** `GET /api/v1/posts/getPosts` (or `GET /api/v1/posts`)
- **Response (200 OK):**
  ```json
  [
    {
      "_id": "673f912c4...",
      "name": "First Backend Post",
      "description": "Learning Express and MongoDB step-by-step.",
      "age": 22,
      "createdAt": "2026-11-03T07:15:00.000Z",
      "updatedAt": "2026-11-03T07:15:00.000Z"
    }
  ]
  ```

#### C. Update Post
- **Method / URL:** `PATCH /api/v1/posts/update/:id` (or `PATCH /api/v1/posts/updatepost/:id`)
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "description": "Updated post content after testing API.",
    "age": 23
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Post Updated Successfully",
    "post": {
      "_id": "673f912c4...",
      "name": "First Backend Post",
      "description": "Updated post content after testing API.",
      "age": 23,
      "updatedAt": "2026-11-03T07:20:00.000Z"
    }
  }
  ```

#### D. Delete Post
- **Method / URL:** `DELETE /api/v1/posts/delete/:id` (or `DELETE /api/v1/posts/deletepost/:id`)
- **Response (200 OK):**
  ```json
  {
    "message": "Post successfully deleted"
  }
  ```

---

## 🧪 Testing with Postman

1. Open the **Postman Desktop App**.
2. Click **Import** (top left).
3. Select the file: `postman/Intro_to_Backend.postman_collection.json` located in this repository.
4. A collection titled **"Intro to Backend - API Collection"** will appear with all predefined requests.
5. In Postman collection variables, ensure `baseUrl` is set to `http://localhost:4000`.
6. Run requests in sequence:
   1. `Health Check`
   2. `Register User`
   3. `Login User`
   4. `Create Post`
   5. `Get All Posts` (copy the created `_id` into the `postId` variable)
   6. `Update Post`
   7. `Delete Post`

---

## 📚 Credits & Reference

- Tutorial: [Intro to Backend Web Development – Node.js & Express Tutorial for Beginners](https://www.youtube.com/watch?v=KOutPbKc9UM) on freeCodeCamp.org
- Instructor: Shivani (Hack Club)
- Architecture Notes: [Excalidraw Diagram](https://excalidraw.com/#json=MZ-nK2h_8IKWFL0Nm1gxH,QJrqIq4vpqwtzvjh4YMFIA)
