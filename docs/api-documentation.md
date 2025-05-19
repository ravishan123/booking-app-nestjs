# Booking API Documentation

## Overview
The Booking API is a RESTful service built with NestJS and Prisma that manages users and their bookings. It provides endpoints for creating, reading, updating, and deleting users and their bookings.

## Base URL
```
http://localhost:3000
```

## Authentication
Currently, the API does not implement authentication. All endpoints are publicly accessible.

## API Endpoints

### Users

#### Create a User
```http
POST /users
```

Request Body:
```json
{
  "username": "string",
  "email": "string"
}
```

Response (201 Created):
```json
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### Get All Users
```http
GET /users
```

Response (200 OK):
```json
[
  {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
]
```

#### Get User by ID
```http
GET /users/:id
```

Response (200 OK):
```json
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### Update User
```http
PATCH /users/:id
```

Request Body:
```json
{
  "username": "string",
  "email": "string"
}
```

Response (200 OK):
```json
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### Delete User
```http
DELETE /users/:id
```

Response (204 No Content)

### Bookings

#### Create a Booking
```http
POST /bookings
```

Request Body:
```json
{
  "startTime": "datetime",
  "endTime": "datetime",
  "notes": "string",
  "userId": "uuid"
}
```

Response (201 Created):
```json
{
  "id": "uuid",
  "startTime": "datetime",
  "endTime": "datetime",
  "notes": "string",
  "status": "PENDING",
  "userId": "uuid",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### Get All Bookings
```http
GET /bookings
```

Response (200 OK):
```json
[
  {
    "id": "uuid",
    "startTime": "datetime",
    "endTime": "datetime",
    "notes": "string",
    "status": "PENDING",
    "userId": "uuid",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
]
```

#### Get Booking by ID
```http
GET /bookings/:id
```

Response (200 OK):
```json
{
  "id": "uuid",
  "startTime": "datetime",
  "endTime": "datetime",
  "notes": "string",
  "status": "PENDING",
  "userId": "uuid",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### Update Booking
```http
PATCH /bookings/:id
```

Request Body:
```json
{
  "startTime": "datetime",
  "endTime": "datetime",
  "notes": "string",
  "status": "PENDING | CONFIRMED | CANCELLED | COMPLETED"
}
```

Response (200 OK):
```json
{
  "id": "uuid",
  "startTime": "datetime",
  "endTime": "datetime",
  "notes": "string",
  "status": "PENDING",
  "userId": "uuid",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### Delete Booking
```http
DELETE /bookings/:id
```

Response (204 No Content)

## Data Models

### User
```typescript
{
  id: string;        // UUID
  username: string;  // Min length: 3
  email: string;     // Valid email format
  createdAt: Date;
  updatedAt: Date;
}
```

### Booking
```typescript
{
  id: string;        // UUID
  startTime: Date;
  endTime: Date;     // Must be after startTime
  notes?: string;    // Optional
  status: BookingStatus;
  userId: string;    // UUID
  createdAt: Date;
  updatedAt: Date;
}
```

### BookingStatus Enum
```typescript
enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}
```

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["error message"],
  "error": "Bad Request"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "User with ID {id} not found",
  "error": "Not Found"
}
```

## Validation Rules

### User
- Username must be at least 3 characters long
- Email must be a valid email format
- Email must be unique

### Booking
- Start time must be a valid date
- End time must be a valid date
- End time must be after start time
- User ID must be a valid UUID
- Status must be one of: PENDING, CONFIRMED, CANCELLED, COMPLETED

## Example Usage

### Creating a User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com"
  }'
```

### Creating a Booking
```bash
curl -X POST http://localhost:3000/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "startTime": "2024-03-10T10:00:00Z",
    "endTime": "2024-03-10T11:00:00Z",
    "notes": "Meeting with client",
    "userId": "user-uuid-here"
  }'
```

## Rate Limiting
Currently, the API does not implement rate limiting.

## CORS
The API allows requests from all origins.

## Database
The API uses PostgreSQL as its database, managed by Prisma ORM.

## Development
To run the API locally:

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file with:
```
DATABASE_URL="postgresql://username:password@localhost:5432/booking_db?schema=public"
```

3. Run database migrations:
```bash
npx prisma migrate dev
```

4. Start the development server:
```bash
npm run start:dev
```

## Testing
Run the test suite:
```bash
npm test
```

Run e2e tests:
```bash
npm run test:e2e
``` 