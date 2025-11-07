# Full-Stack Blog Page – CRUD + Auth

## Overview
A full-stack blog application where authenticated users can create, read, update, and delete blog posts. Features include authentication, post management, user profiles, search, pagination, and error handling.

## Tech Stack
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Frontend:** React
- **Styling:** (Optional) Tailwind CSS or Material UI

## Features
- User registration and login with JWT authentication
- Secure password hashing
- CRUD operations for blog posts
- Only post owners can edit/delete their posts
- Pagination and search by title/author
- User profile page with own posts
- Form validation and error handling
- Toast notifications for success/failure
- Loading and empty states

## Setup Instructions

### 1. Clone the Repository
```
git clone <your-repo-url>
cd full-stack-blog-page
```

### 2. Backend Setup (`server`)
- Go to the `server` folder:
  ```
  cd server
  ```
- Install dependencies:
  ```
  npm install
  ```
- Create a `.env` file (see `.env.example`):
  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  PORT=5000
  ```
- Start the server:
  ```
  npx nodemon app.js
  ```

### 3. Frontend Setup (`client`)
- Go to the `client` folder:
  ```
  cd ../client
  ```
- Install dependencies:
  ```
  npm install
  ```
- Start the React app:
  ```
  npm start
  ```

## API Documentation

### Auth
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and get JWT token

### Posts
- `GET /api/posts?search=&page=&limit=` – List posts
- `GET /api/posts/:id` – Get single post
- `POST /api/posts` – Create post (auth required)
- `PUT /api/posts/:id` – Update post (auth + owner)
- `DELETE /api/posts/:id` – Delete post (auth + owner)

## Environment Variables

### Server (`server/.env.example`)
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Client (`client/.env.example`)
```
REACT_APP_API_URL=http://localhost:5000
```

## Screenshots
_Add screenshots or a demo GIF here._

## Sample Requests
_You can use Postman or Thunder Client to test the API. See sample requests in the documentation above._

## License
MIT
