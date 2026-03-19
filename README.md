# Planora - MERN Project Management Utility

Planora is a complete MERN stack web application that follows a Kanban-style SDLC workflow for managing project tasks.

## Features

### Kanban Workflow (SDLC)
Tasks move through four stages:
- Todo
- In Progress
- Testing
- Done

### User Management
- Create user with name and email
- Get all users
- Persist users in MongoDB

### Task Management
Each task contains:
- title
- description (optional)
- assignedTo (User reference)
- status (default: Todo)
- history of status transitions

Task capabilities:
- Create task
- Get all tasks (with assigned user populated)
- Update task status
- Delete task

### History Tracking
Every status update appends a new history entry with:
- status
- timestamp

This creates an audit trail for each task lifecycle.

### Security
- CORS enabled
- API key middleware enabled on all API routes
- Required header: x-api-key: 12345

## Project Structure

- backend
  - models
    - User.js
    - Task.js
  - controllers
    - userController.js
    - taskController.js
  - routes
    - userRoutes.js
    - taskRoutes.js
  - middleware
    - apiKey.js
  - server.js
  - package.json

- frontend
  - public
    - index.html
  - src
    - components
      - Navbar.js
      - UserForm.js
      - TaskForm.js
      - TaskCard.js
    - pages
      - Home.js
      - Dashboard.js
    - App.js
    - index.js
    - api.js
    - styles.css
  - package.json

## Setup Instructions

### Prerequisites
- Node.js (18+ recommended)
- npm
- MongoDB Atlas cluster (free tier works) with a database user created

### 1. Clone and open project
Open the root folder in your editor.

### 2. Configure backend environment
Copy backend/.env.example to backend/.env and fill in your MongoDB Atlas credentials:

cp backend/.env.example backend/.env

PORT=5000
MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.lt1o4y7.mongodb.net/planora?appName=Cluster0

Replace <db_username> and <db_password> with the database user you created for the cluster.

### 3. Install backend dependencies
In backend folder:

npm install

### 4. Install frontend dependencies
In frontend folder:

npm install

### 5. Run backend
In backend folder:

npm run dev

or

npm start

### 6. Run frontend
In frontend folder:

npm start

Frontend runs on http://localhost:3000 and calls backend at http://localhost:5000/api.

## API Endpoints

All endpoints require the header:
- x-api-key: 12345

### Users
- POST /api/users
- GET /api/users

### Tasks
- POST /api/tasks
- GET /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

## Example Request Bodies

### Create User
POST /api/users

{
  "name": "Alice",
  "email": "alice@example.com"
}

### Create Task
POST /api/tasks

{
  "title": "Create auth module",
  "description": "Build login and session flow",
  "assignedTo": "<USER_ID>"
}

### Update Task Status
PUT /api/tasks/:id

{
  "status": "Testing"
}

## Kanban Approach Explanation
Planora maps a practical SDLC process to a Kanban board:
- Todo: planned work not started
- In Progress: active implementation
- Testing: QA and verification phase
- Done: completed and validated tasks

This keeps project visibility clear for teams and stakeholders.

## History Tracking Explanation
Whenever task status changes, backend logic appends a history object to the task:
- new status
- current timestamp

This supports traceability and helps teams inspect how long tasks remain in each phase.

## Future Improvements
- Next.js frontend for SEO and advanced routing
- Flutter mobile app for cross-platform mobile access
- Golang microservice for high-throughput task analytics
- Python service for ML-based effort prediction and smart prioritization

## Notes
This implementation uses a simple API key for basic protection. For production, replace it with robust authentication and authorization (JWT, sessions, RBAC).
