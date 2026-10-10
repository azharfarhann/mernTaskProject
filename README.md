# User Registration Task

This is an end-to-end full-stack coding task.

## Features

- Register users with their details.
- Generate a User ID and random password.
- Store user details in MongoDB and hash the password using bcrypt.
- Send the login details through email using Nodemailer and Gmail SMTP.
- Login using User ID and password.
- View registered users with pagination.

## Technologies Used

- React and Tailwind CSS
- Node.js and Express.js
- MongoDB and Mongoose
- Axios, bcryptjs and Nodemailer

## How to Run

**Backend**

```bash
cd server
npm install
npm run dev
```

**Frontend** (Another terminal)

```bash
cd client
npm install
npm run dev
```

Create a `server/.env` file with the required MongoDB and email credentials.

## API Routes

- `POST /api/public/user/register` - Register a user.
- `POST /api/public/user/login` - Validate login credentials.
- `GET /api/public/user/users?page=1&limit=5` - Get users with pagination.
