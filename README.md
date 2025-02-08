# Library Management System API

REST API for managing library operations with JWT authentication and role-based access control.

## Features

- JWT Authentication with refresh tokens
- Role-based Access Control (Admin, Librarian, Member)
- CRUD operations for Books, Authors, Users
- Borrow/Return functionality
- Rate limiting
- Request validation
- Error handling
- Search & Pagination
- CORS support
- Security headers (helmet)
- MongoDB integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT
- **Security**: helmet, xss-clean, express-rate-limit
- **Testing**: Jest, Supertest

## Installation

1. Clone repository
2. Install dependencies:

```bash
npm install
```

3. Create `.env` file using `.env.example`
4. Start development server:

```bash
npm run dev
```

## Environment Variables

```ini
PORT=3000
MONGODB_URI=mongodb://localhost:27017/library
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
TOKEN_EXPIRY=1h
RATE_LIMIT_WINDOW_MS=15*60*1000
RATE_LIMIT_MAX=100
```

## API Endpoints

### Authentication

- `POST /auth/login` - Get access token
- `POST /auth/refresh-token` - Refresh access token

### Books (Admin/Librarian)

- `GET /books` - List all books
- `POST /books` - Create new book
- `PUT /books/:id` - Update book
- `DELETE /books/:id` - Delete book

### Users (Admin only)

- `GET /users` - List all users
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Borrowing (Member)

- `POST /books/:id/borrow` - Borrow book
- `POST /books/:id/return` - Return book

## Rate Limiting

API is protected with rate limiting (100 requests/15 minutes)

## Error Handling

Standard error format:

```json
{
  "statusCode": 404,
  "message": "Book not found"
}
```

## Testing

Run tests with:

```bash
npm test
```

## Deployment

1. Set production environment variables
2. Build with:

```bash
npm run build
```

3.. Start production server:

```bash
npm start
```

## TODO

- Change to TypeScript because the error `SyntaxError: Invalid or unexpected token`
- Feature Test
- Complete the reguirements of Task 1 `https://github.com/Muhammad235/Backend-Engineering-projects?tab=readme-ov-file#task-1-rest-api-for-a-library-management-system`
- Documentate with Swagger and Postman
