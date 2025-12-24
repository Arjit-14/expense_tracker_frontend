1. Project Summary 

Built a full-stack expense and task management web application with authentication.
Users can sign up, log in, and perform CRUD operations on tasks and expenses.
The frontend is built using React, the backend using Node.js and Express, data is stored in MongoDB Atlas, and authentication is handled using JWT.
The backend is deployed on Render and the frontend on Vercel.

2. Tech Stack

Frontend: React
Backend: Node.js, Express
Database: MongoDB Atlas
Authentication: JWT, bcrypt
Deployment: Render (backend), Vercel (frontend)
Version Control: GitHub

3. High-Level Architecture

React Frontend
   ↓ HTTP requests
Express Backend (JWT middleware)
   ↓
MongoDB Atlas

Frontend and backend are decoupled and communicate via REST APIs.

4. Authentication Flow (Login)
User enters username and password on the frontend
Frontend sends credentials to backend
Backend hashes the entered password and compares it with the stored hashed password using bcrypt
If valid, backend generates a JWT token
Token is sent back to frontend
Frontend stores token in localStorage
Token is sent in Authorization header for protected requests

5. Why JWT Was Used

Stateless authentication
Backend does not store session data
Works well with cloud deployment and scaling

6. Route Protection (Middleware)

Authentication middleware intercepts requests
Checks for JWT token in Authorization header
Verifies token using secret key
If valid → request proceeds
If invalid or missing → returns unauthorized error

7. Data Modeling

Collections
Users
Tasks
Expenses

Each task and expense is linked to a user using userId.

8. What Happens If Token Is Missing

Request reaches authentication middleware
Middleware detects missing token
Request is rejected with 401 Unauthorized
Protected route logic is not executed

9. Deployment Flow

Code pushed to GitHub
Render automatically redeploys backend
Vercel automatically rebuilds frontend
Environment variables used for secrets
MongoDB Atlas used as cloud database
This provides basic CI/CD through GitHub integration.

10. Security Decisions

Passwords are hashed using bcrypt
JWT secret and database URI stored in environment variables
Protected routes cannot be accessed without a valid token

11. Known Limitations

Token stored in localStorage (vulnerable to XSS)
No refresh token implementation
Minimal frontend validation
Basic error handling

12. Improvements If Given More Time

Use HTTP-only cookies for tokens
Add refresh tokens and token expiry handling
Improve frontend loading and error states
Add role-based access control

13. Resume Bullet Point
Built and deployed a full-stack expense tracker using React, Node.js, MongoDB Atlas, and JWT authentication with CI/CD via GitHub, Render, and Vercel.