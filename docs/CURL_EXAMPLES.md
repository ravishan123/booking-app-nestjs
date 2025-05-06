# cURL Examples

## User Endpoints

### Create User

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com"
  }'
```

### Get All Users

```bash
curl -X GET http://localhost:3000/users
```

### Get User by ID

```bash
curl -X GET http://localhost:3000/users/e73490d4-0ad0-439d-95fa-6b0390759257
```

### Update User

```bash
curl -X PATCH http://localhost:3000/users/e73490d4-0ad0-439d-95fa-6b0390759257 \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john.doe",
    "email": "john.doe@example.com"
  }'
```

### Delete User

```bash
curl -X DELETE http://localhost:3000/users/e73490d4-0ad0-439d-95fa-6b0390759257
```

## Booking Endpoints

### Create Booking

```bash
curl -X POST http://localhost:3000/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "startTime": "2024-05-06T10:00:00Z",
    "endTime": "2024-05-06T11:00:00Z",
    "notes": "Meeting with client",
    "userId": "e73490d4-0ad0-439d-95fa-6b0390759257"
  }'
```

### Get All Bookings

```bash
curl -X GET http://localhost:3000/bookings
```

### Get Booking by ID

```bash
curl -X GET http://localhost:3000/bookings/e286ed79-4b8b-4394-b11a-bf324d87bcea
```

### Update Booking

```bash
curl -X PATCH http://localhost:3000/bookings/e286ed79-4b8b-4394-b11a-bf324d87bcea \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed",
    "notes": "Updated meeting notes"
  }'
```

### Delete Booking

```bash
curl -X DELETE http://localhost:3000/bookings/e286ed79-4b8b-4394-b11a-bf324d87bcea
```

## Example Usage Flow

### 1. Create a User

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com"
  }'
```

Response:

```json
{
  "id": "e73490d4-0ad0-439d-95fa-6b0390759257",
  "username": "john_doe",
  "email": "john@example.com",
  "createdAt": "2024-05-06T06:54:41.232Z",
  "updatedAt": "2024-05-06T06:54:41.232Z"
}
```

### 2. Create a Booking for the User

```bash
curl -X POST http://localhost:3000/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "startTime": "2024-05-06T10:00:00Z",
    "endTime": "2024-05-06T11:00:00Z",
    "notes": "Meeting with client",
    "userId": "e73490d4-0ad0-439d-95fa-6b0390759257"
  }'
```

Response:

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

### 3. Update the Booking Status

```bash
curl -X PATCH http://localhost:3000/bookings/e286ed79-4b8b-4394-b11a-bf324d87bcea \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed"
  }'
```

Response:

```json
{
  "id": "e286ed79-4b8b-4394-b11a-bf324d87bcea",
  "startTime": "2024-05-06T10:00:00.000Z",
  "endTime": "2024-05-06T11:00:00.000Z",
  "notes": "Meeting with client",
  "status": "confirmed",
  "userId": "e73490d4-0ad0-439d-95fa-6b0390759257",
  "createdAt": "2024-05-06T06:54:59.572Z",
  "updatedAt": "2024-05-06T06:55:12.671Z"
}
```

## Notes

1. Replace the UUIDs in the examples with actual IDs returned from your API calls
2. All timestamps should be in ISO 8601 format
3. The booking status can be one of: "pending", "confirmed", "cancelled"
4. All endpoints return JSON responses
5. Error responses will include a status code and error message

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
