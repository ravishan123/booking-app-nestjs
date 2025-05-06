# API Documentation

## Base URL

```
http://localhost:3000
```

## Authentication

Currently, the API does not require authentication. This will be implemented in future versions.

## Common Response Formats

### Success Response

```json
{
  "statusCode": 200,
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

## User Endpoints

### Create User

Creates a new user in the system.

**Endpoint:** `POST /users`

**Request Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com"
}
```

**Response (201 Created):**

```json
{
  "id": "e73490d4-0ad0-439d-95fa-6b0390759257",
  "username": "john_doe",
  "email": "john@example.com",
  "createdAt": "2024-05-06T06:54:41.232Z",
  "updatedAt": "2024-05-06T06:54:41.232Z"
}
```

**Validation Rules:**

- `username`: Required, string, unique
- `email`: Required, valid email format, unique

### Get All Users

Retrieves a list of all users.

**Endpoint:** `GET /users`

**Response (200 OK):**

```json
[
  {
    "id": "e73490d4-0ad0-439d-95fa-6b0390759257",
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2024-05-06T06:54:41.232Z",
    "updatedAt": "2024-05-06T06:54:41.232Z"
  }
]
```

### Get User by ID

Retrieves a specific user by their ID.

**Endpoint:** `GET /users/:id`

**Parameters:**

- `id`: UUID of the user

**Response (200 OK):**

```json
{
  "id": "e73490d4-0ad0-439d-95fa-6b0390759257",
  "username": "john_doe",
  "email": "john@example.com",
  "createdAt": "2024-05-06T06:54:41.232Z",
  "updatedAt": "2024-05-06T06:54:41.232Z"
}
```

**Error Responses:**

- `404 Not Found`: User not found

### Update User

Updates an existing user's information.

**Endpoint:** `PATCH /users/:id`

**Parameters:**

- `id`: UUID of the user

**Request Body:**

```json
{
  "username": "john.doe",
  "email": "john.doe@example.com"
}
```

**Response (200 OK):**

```json
{
  "id": "e73490d4-0ad0-439d-95fa-6b0390759257",
  "username": "john.doe",
  "email": "john.doe@example.com",
  "createdAt": "2024-05-06T06:54:41.232Z",
  "updatedAt": "2024-05-06T06:55:29.633Z"
}
```

**Error Responses:**

- `404 Not Found`: User not found
- `400 Bad Request`: Invalid input data

### Delete User

Deletes a user from the system.

**Endpoint:** `DELETE /users/:id`

**Parameters:**

- `id`: UUID of the user

**Response (200 OK):**

```json
{
  "message": "User successfully deleted"
}
```

**Error Responses:**

- `404 Not Found`: User not found

## Booking Endpoints

### Create Booking

Creates a new booking for a user.

**Endpoint:** `POST /bookings`

**Request Body:**

```json
{
  "startTime": "2024-05-06T10:00:00Z",
  "endTime": "2024-05-06T11:00:00Z",
  "notes": "Meeting with client",
  "userId": "e73490d4-0ad0-439d-95fa-6b0390759257"
}
```

**Response (201 Created):**

```json
{
  "id": "e286ed79-4b8b-4394-b11a-bf324d87bcea",
  "startTime": "2024-05-06T10:00:00.000Z",
  "endTime": "2024-05-06T11:00:00.000Z",
  "notes": "Meeting with client",
  "status": "pending",
  "userId": "e73490d4-0ad0-439d-95fa-6b0390759257",
  "createdAt": "2024-05-06T06:54:59.572Z",
  "updatedAt": "2024-05-06T06:54:59.572Z"
}
```

**Validation Rules:**

- `startTime`: Required, valid ISO date string
- `endTime`: Required, valid ISO date string, must be after startTime
- `notes`: Optional, string
- `userId`: Required, valid UUID of existing user

### Get All Bookings

Retrieves a list of all bookings.

**Endpoint:** `GET /bookings`

**Response (200 OK):**

```json
[
  {
    "id": "e286ed79-4b8b-4394-b11a-bf324d87bcea",
    "startTime": "2024-05-06T10:00:00.000Z",
    "endTime": "2024-05-06T11:00:00.000Z",
    "notes": "Meeting with client",
    "status": "pending",
    "userId": "e73490d4-0ad0-439d-95fa-6b0390759257",
    "createdAt": "2024-05-06T06:54:59.572Z",
    "updatedAt": "2024-05-06T06:54:59.572Z"
  }
]
```

### Get Booking by ID

Retrieves a specific booking by its ID.

**Endpoint:** `GET /bookings/:id`

**Parameters:**

- `id`: UUID of the booking

**Response (200 OK):**

```json
{
  "id": "e286ed79-4b8b-4394-b11a-bf324d87bcea",
  "startTime": "2024-05-06T10:00:00.000Z",
  "endTime": "2024-05-06T11:00:00.000Z",
  "notes": "Meeting with client",
  "status": "pending",
  "userId": "e73490d4-0ad0-439d-95fa-6b0390759257",
  "createdAt": "2024-05-06T06:54:59.572Z",
  "updatedAt": "2024-05-06T06:54:59.572Z"
}
```

**Error Responses:**

- `404 Not Found`: Booking not found

### Update Booking

Updates an existing booking's information.

**Endpoint:** `PATCH /bookings/:id`

**Parameters:**

- `id`: UUID of the booking

**Request Body:**

```json
{
  "status": "confirmed",
  "notes": "Updated meeting notes"
}
```

**Response (200 OK):**

```json
{
  "id": "e286ed79-4b8b-4394-b11a-bf324d87bcea",
  "startTime": "2024-05-06T10:00:00.000Z",
  "endTime": "2024-05-06T11:00:00.000Z",
  "notes": "Updated meeting notes",
  "status": "confirmed",
  "userId": "e73490d4-0ad0-439d-95fa-6b0390759257",
  "createdAt": "2024-05-06T06:54:59.572Z",
  "updatedAt": "2024-05-06T06:55:12.671Z"
}
```

**Validation Rules:**

- `status`: Optional, enum ('pending', 'confirmed', 'cancelled')
- `notes`: Optional, string

**Error Responses:**

- `404 Not Found`: Booking not found
- `400 Bad Request`: Invalid input data

### Delete Booking

Deletes a booking from the system.

**Endpoint:** `DELETE /bookings/:id`

**Parameters:**

- `id`: UUID of the booking

**Response (200 OK):**

```json
{
  "message": "Booking successfully deleted"
}
```

**Error Responses:**

- `404 Not Found`: Booking not found

## Status Codes

- `200 OK`: Request succeeded
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Data Types

### UUID

- Format: 8-4-4-4-12 hexadecimal digits
- Example: `e73490d4-0ad0-439d-95fa-6b0390759257`

### Timestamp

- Format: ISO 8601
- Example: `2024-05-06T10:00:00.000Z`

### Booking Status

- Enum values: `pending`, `confirmed`, `cancelled`
- Default: `pending`
