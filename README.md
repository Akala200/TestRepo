This is a simple Express-based project using TypeScript, featuring user registration with validation, JWT authentication, email verification, and MongoDB integration.

Features
User Registration with validation (email, password strength, password confirmation).
JWT Authentication for secure login and authorization.
Email Verification with JWT token sent as part of the verification link.
MongoDB Integration with Mongoose for data storage.
Rate Limiting using express-rate-limit to avoid abuse.
Security Headers via helmet.
File Upload using multer.
Project Setup
Prerequisites
Make sure you have the following installed:

Node.js
MongoDB (or use a MongoDB cloud service like MongoDB Atlas)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Akala200/TestRepo.git
cd express-project
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root directory and add the following variables:

env
Copy code
PORT=3000
DATABASE_URL=mongodb://localhost:27017/expres
JWT_SECRET=your-jwt-secret
PORT: Port on which the server will run.
DATABASE_URL: MongoDB connection URL.
JWT_SECRET: A secret key used for signing JWT tokens.
Available Scripts
Start the server (production)

bash
Copy code
npm start
Runs the server using the compiled JavaScript from the dist folder.

Development server

bash
Copy code
npm run dev
Runs the server with nodemon, which will watch for changes in the src directory and automatically restart the server.

Build TypeScript files

bash
Copy code
npm run build
Compiles the TypeScript files into JavaScript in the dist folder.

File Structure
bash
Copy code
├── src/
│   ├── controllers/         # Controllers for handling business logic
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── config/              # Configuration files (e.g., DB connection, secret keys)
│   └── server.ts            # Main entry point for the application
├── dist/                    # Compiled JavaScript files
├── .env                     # Environment variables (not committed to version control)
├── package.json             # Project metadata and dependencies
└── tsconfig.json            # TypeScript configuration
Environment Variables
PORT: Port number for the server.
DATABASE_URL: MongoDB connection URL.
JWT_SECRET: Secret used to sign JWT tokens.
Dependencies
This project uses the following libraries:

express: Web framework for building REST APIs.
bcrypt: Password hashing library.
jsonwebtoken: JSON Web Token implementation for authentication.
mongoose: MongoDB ODM for data modeling.
express-validator: Middleware for validating incoming data in requests.
express-rate-limit: Rate-limiting to prevent abuse of the API.
helmet: Security middleware to set HTTP headers for protection.
morgan: HTTP request logger middleware.
multer: Middleware for handling file uploads.
Usage
Once the server is running, you can access the following endpoints:

Register a new user
POST /api/auth/register

Request body:

json
Copy code
{
  "email": "user@example.com",
  "password": "Password123!",
  "confirmPassword": "Password123!"
}
Response:

201 Created: User registered successfully.
400 Bad Request: Validation errors (e.g., email already exists, password too weak).
Verify email
GET /api/auth/verify-email?token=<jwt_token>
Response:
200 OK: Email successfully verified.
400 Bad Request: Invalid or expired token.
Development
Running Tests
Add your tests in the tests/ folder and run them with your preferred testing framework (e.g., Jest, Mocha).

Debugging
You can use nodemon in development to automatically restart the server when changes are made to the src/ folder.

Linting and Formatting
To ensure the code follows consistent styling, you can use ESLint and Prettier for linting and formatting.