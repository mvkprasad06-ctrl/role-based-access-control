# Role-Based Access Control & Authorization

This project is a simple Role-Based Access Control (RBAC) web application built using Node.js, Express.js, SQLite, JWT authentication, and a basic HTML/CSS/JavaScript frontend.

The main purpose of this project is to demonstrate how different user roles such as Admin and User can access different parts of an application based on authorization rules.

## Features

- User registration with role selection
- User login using email and password
- Password hashing using bcryptjs
- JWT-based authentication
- Protected user dashboard route
- Admin-only route protection
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
│
├── database.js
├── server.js
├── package.json
├── package-lock.json
├── README.md
├── .env.example
├── .gitignore
│
└── public/
    ├── index.html
    ├── dashboard.html
    ├── admin.html
    ├── style.css
    └── script.js

## File Purpose

server.js: Main backend file. It creates the Express server, handles API routes, performs JWT authentication, and protects routes based on user roles.

database.js: Connects the application to the SQLite database. It creates the users table and inserts default Admin and User accounts.

public/index.html: Main login and registration page. Users can login or register with either User or Admin role.

public/dashboard.html: Protected dashboard page. Only logged-in users with a valid JWT token can access it.

public/admin.html: Admin-only page. Only users with the Admin role can access this page and view all registered users.

public/script.js: Handles frontend logic such as registration, login, token storage, protected page access, role checking, and logout.

public/style.css: Contains styling for the login page, dashboard page, and admin panel.

## Access Flow

1. A user logs in using email and password.
2. The backend verifies the user credentials.
3. If the login is successful, a JWT token is generated.
4. The token contains the user role.
5. The frontend stores the token in localStorage.
6. Protected pages send the token to the backend.
7. The backend checks whether the token is valid.
8. Admin-only routes also check whether the user role is admin.
9. If the user is not an admin, access is denied.
10. The frontend also hides admin options for normal users.

## API Routes

POST /api/register  
Creates a new user account.

POST /api/login  
Logs in the user and returns a JWT token.

GET /api/dashboard  
Protected route. Accessible by logged-in users.

GET /api/admin  
Admin-only protected route. Accessible only by users with the Admin role.

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

- Completion of authentication task
- Backend routing implementation
- JWT-based authorization
- Role-based backend logic
- Protected routes based on user roles
- UI changes based on user permissions
- Documentation explaining access flow

## Conclusion

This project successfully demonstrates Role-Based Access Control and Authorization. It shows how real-world applications restrict routes and features based on user roles such as Admin and User.

