# Role-Based Access Control & Authorization

This project is a simple Role-Based Access Control web application built using Node.js, Express.js, SQLite, JWT authentication, and HTML/CSS/JavaScript.

The main purpose of this project is to show how different users can access different pages based on their role.

## Features

- User registration with role selection
- User login using email and password
- Password hashing using bcryptjs
- JWT-based authentication
- Protected user dashboard
- Admin-only page access
- Role-based UI changes
- SQLite database integration
- Admin can view all registered users
- Normal users cannot access the admin panel

## Demo Login Details

Admin Login:

    Email: admin@example.com
    Password: Admin@123

User Login:

    Email: user@example.com
    Password: User@123

## Technologies Used

- Node.js
- Express.js
- SQLite
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- HTML
- CSS
- JavaScript

## Project Structure

    role-based-access-control/
    ├── database.js
    ├── server.js
    ├── package.json
    ├── package-lock.json
    ├── README.md
    ├── .env.example
    ├── .gitignore
    └── public/
        ├── index.html
        ├── dashboard.html
        ├── admin.html
        ├── style.css
        └── script.js

## File Purpose

### server.js

Main backend file. It creates the Express server, handles API routes, performs JWT authentication, and protects routes based on user roles.

### database.js

Connects the application to the SQLite database. It creates the users table and inserts default Admin and User accounts.

### public/index.html

Main login and registration page. Users can login or register with either User or Admin role.

### public/dashboard.html

Protected dashboard page. Only logged-in users with a valid JWT token can access it.

### public/admin.html

Admin-only page. Only users with the Admin role can access this page and view all registered users.

### public/script.js

Handles frontend logic such as registration, login, token storage, protected page access, role checking, and logout.

### public/style.css

Contains styling for the login page, dashboard page, and admin panel.

## Access Flow

1. User logs in using email and password.
2. Backend verifies the user credentials.
3. If login is successful, a JWT token is generated.
4. The token contains the user role.
5. Frontend stores the token in localStorage.
6. Protected pages send the token to the backend.
7. Backend checks whether the token is valid.
8. Admin-only routes also check whether the user role is admin.
9. If the user is not admin, access is denied.
10. Frontend hides admin options for normal users.

## API Routes

Register User:

    POST /api/register

Login User:

    POST /api/login

User Dashboard:

    GET /api/dashboard

Admin Panel:

    GET /api/admin

## How to Run

Install dependencies:

    npm install

Create a .env file:

    PORT=5050
    JWT_SECRET=role_based_access_control_secret_key

Start the server:

    npm run dev

Open the app in browser:

    http://localhost:5050

## Task Requirements Covered

- Authentication system completed
- Backend routing implemented
- JWT-based authorization added
- Role-based backend logic added
- Protected routes based on user roles
- UI changes based on user permissions
- Documentation explaining access flow

## Conclusion

This project successfully demonstrates Role-Based Access Control and Authorization. It shows how applications restrict routes and features based on user roles such as Admin and User.
