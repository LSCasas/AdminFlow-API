# AdminFlow

A Node.js API for managing users, areas, consumables, and usage records. Built with clean architecture principles to ensure modularity, scalability, and maintainability. It provides secure authentication, structured MongoDB models, and on-demand Excel report generation.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Usage](#how-to-use-this-project)
- [Requirements](#requirements)
- [Contribution](#contribution)
- [Learn More](#learn-more)

---

## Project Structure

```
AdminFlow-API/
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

- Modular route structure for scalability
- Mongoose-based MongoDB models
- JWT-based authentication and bcrypt password hashing
- Centralized middleware for validation and error handling
- Environment configuration using dotenv
- RESTful API design
- Excel report generation

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/LSCasas/AdminFlow-API.git
   cd AdminFlow-API
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Copy the example file and edit your settings:

   ```bash
   cp example.env .env
   ```

4. **Edit the `.env` file** with your configurations:

   ```env
   DB_USER=
   DB_PASSWORD=
   DB_HOST=
   DB_NAME=
   ```

5. **Run the server:**

   ```bash
   npm run dev
   ```

---

## How to Use This Project

### Example Requests

Use `curl` or Postman to test routes.

**1. Authenticate and get token:**

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

---

## Requirements

- Node.js >= 18.x
- npm
- MongoDB (local or Atlas)
- Vercel account (optional for deployment)

---

## Contribution

If you want to contribute to this project, follow the steps below:

1. Fork the repository.

2. Create a new branch for your feature:

   ```bash
   git checkout -b feature/new-feature
   ```

3. Make your changes.

4. Commit your changes:

   ```bash
   git commit -am 'Add new feature'
   ```

5. Push your changes to your fork:

   ```bash
   git push origin feature/new-feature
   ```

6. Create a Pull Request for your changes to be reviewed and merged into the main project.

---

## 📚 Learn More

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [dotenv Documentation](https://github.com/motdotla/dotenv)
- [Vercel Documentation](https://vercel.com/docs)

---
