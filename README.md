# AdminFlow - API

The API focuses on managing users, areas, consumables, and usage records. It provides functionalities for authentication, user management, area and consumable handling, and record registration. It generates Excel reports on demand. Designed with clean architecture principles, the API ensures modularity, scalability, and maintainability for efficient resource tracking.

---

## Project Structure

```
AdminFlow-API/               # Main project directory
├── README.md                # Project documentation
├── example.env              # Example environment variables
├── index.js                 # Entry point of the application
├── package.json             # Project metadata and dependencies
├── vercel.json              # Deployment configuration for Vercel
├── request/                 # (Optional) Directory for API request samples
└── src/                     # Source code
    ├── lib/                 # Utility functions and libraries
    ├── middleware/          # Middleware (authentication, validation, etc.)
    ├── models/              # MongoDB models with Mongoose
    ├── routes/              # API route definitions
    ├── server.js            # Express server configuration
    └── usecases/            # Application business logic / controllers
```

---

## Features

- **Modular Routing**: Routes organized into separate files for scalability.
- **Data Models**: Defined using **Mongoose** for structured interaction with MongoDB.
- **Authentication**: Secure user authentication with **JWT** and hashed passwords using **bcrypt**.
- **Middleware**: Centralized middlewares for authentication, validation, and error handling.
- **Environment Configuration**: Secure management of sensitive information with **dotenv**.
- **RESTful Design**: Consistent, clear API endpoints following REST principles.

---

## Technologies

- **Node.js**
- **Express**
- **MongoDB**
- **jsonwebtoken**
- **bcrypt**/**bcryptjs**
- **dotenv**
- **cors**
- **http-errors**

---

## How to Use This Project

1. **Clone the repository**:

```bash
git clone https://github.com/LSCasas/AdminFlow-API.git
cd AdminFlow-API
```

2. **Install dependencies**:

```bash
npm install
```

3. **Create an environment configuration file**:

```bash
cp example.env .env
```

4. **Edit the `.env` file** with your configurations:

```
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_NAME=

```

5. **Run the server**:

```bash
npm run dev
```

---

## Requirements

- Node.js >= 18.x
- npm
- MongoDB database (local or Atlas)
- Vercel account (optional for deployment)

---

## Deployment

This project is configured for **Vercel** deployment:

```bash
vercel deploy
```

---

## Example Authentication Request

1. Request token:

```
POST /api/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

---
