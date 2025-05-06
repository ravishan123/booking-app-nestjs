# Booking API System Documentation

## Overview

The Booking API is a robust NestJS-based system designed to manage user bookings efficiently. It provides a RESTful API interface for creating, managing, and tracking bookings with user authentication and real-time status updates.

## System Architecture

### Architecture Diagrams

#### System Component Diagram

```mermaid
graph TB
    subgraph Client["Client Applications"]
        direction TB
        REST["REST API Clients"]
        WEB["Web Applications"]
        MOB["Mobile Applications"]
    end

    subgraph NestJS["NestJS Application"]
        direction TB
        subgraph Controllers["Controllers Layer"]
            UC["UserController"]
            BC["BookingController"]
        end

        subgraph Services["Services Layer"]
            US["UserService"]
            BS["BookingService"]
        end

        subgraph DTOs["Data Transfer Objects"]
            CUD["CreateUserDTO"]
            CBD["CreateBookingDTO"]
            UUD["UpdateUserDTO"]
            UBD["UpdateBookingDTO"]
        end

        subgraph Entities["Entity Layer"]
            UE["User Entity"]
            BE["Booking Entity"]
        end

        subgraph Middleware["Middleware Layer"]
            VAL["Validation Pipe"]
            ERR["Error Handler"]
            LOG["Logger"]
        end
    end

    subgraph Database["Database Layer"]
        PG[("PostgreSQL")]
        subgraph Tables["Database Tables"]
            UT["Users Table"]
            BT["Bookings Table"]
        end
    end

    %% Client to Controller connections
    REST --> Controllers
    WEB --> Controllers
    MOB --> Controllers

    %% Controller to Service connections
    UC --> US
    BC --> BS

    %% Service to Entity connections
    US --> UE
    BS --> BE

    %% DTO connections
    CUD --> UC
    CBD --> BC
    UUD --> UC
    UBD --> BC

    %% Entity to Database connections
    UE --> UT
    BE --> BT
    UT --> PG
    BT --> PG

    %% Middleware connections
    VAL --> Controllers
    ERR --> Controllers
    LOG --> Controllers
```

#### Database Schema

```mermaid
erDiagram
    USERS ||--o{ BOOKINGS : "has"

    USERS {
        UUID id PK "Primary Key"
        VARCHAR(255) username "Unique"
        VARCHAR(255) email "Unique"
        TIMESTAMP createdAt "Auto-generated"
        TIMESTAMP updatedAt "Auto-updated"
    }

    BOOKINGS {
        UUID id PK "Primary Key"
        TIMESTAMP startTime "Required"
        TIMESTAMP endTime "Required"
        TEXT notes "Optional"
        VARCHAR(20) status "enum: pending/confirmed/cancelled"
        UUID userId FK "References Users(id)"
        TIMESTAMP createdAt "Auto-generated"
        TIMESTAMP updatedAt "Auto-updated"
    }
```

#### Booking Creation Flow

```mermaid
sequenceDiagram
    actor Client
    participant BC as BookingController
    participant VAL as ValidationPipe
    participant BS as BookingService
    participant US as UserService
    participant DB as PostgreSQL

    Client->>BC: POST /bookings
    Note over Client,BC: Request with booking details

    BC->>VAL: Validate CreateBookingDTO
    alt Invalid Request
        VAL-->>BC: Validation Errors
        BC-->>Client: 400 Bad Request
    else Valid Request
        VAL-->>BC: Validated DTO
        BC->>BS: createBooking(dto)

        BS->>US: findOne(userId)
        alt User Not Found
            US-->>BS: null
            BS-->>BC: User not found error
            BC-->>Client: 404 Not Found
        else User Found
            US-->>BS: User Entity

            BS->>DB: INSERT booking
            alt Database Error
                DB-->>BS: Error
                BS-->>BC: Database error
                BC-->>Client: 500 Internal Error
            else Success
                DB-->>BS: Created Booking
                BS-->>BC: Booking Entity
                BC-->>Client: 201 Created
            end
        end
    end
```

### Key Components

1. **API Layer (NestJS)**

   - Controllers for handling HTTP requests
   - Services for business logic
   - DTOs for data validation
   - TypeORM entities for database mapping
   - Middleware for request processing

2. **Database Layer (PostgreSQL)**
   - User management
   - Booking records
   - Relationship management
   - Data persistence

### Features

- User Management (CRUD operations)
- Booking Management (CRUD operations)
- Data Validation
- Error Handling
- Database Relationships
- UUID Generation
- Timestamp Management

## Database Schema

### Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Bookings Table

```sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startTime TIMESTAMP NOT NULL,
    endTime TIMESTAMP NOT NULL,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    userId UUID REFERENCES users(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### User Endpoints

- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Booking Endpoints

- `POST /bookings` - Create a new booking
- `GET /bookings` - Get all bookings
- `GET /bookings/:id` - Get booking by ID
- `PATCH /bookings/:id` - Update booking
- `DELETE /bookings/:id` - Delete booking

## Technical Stack

- Framework: NestJS
- Database: PostgreSQL
- ORM: TypeORM
- Language: TypeScript
- API Style: REST
- UUID Generation: uuid_generate_v4()
- Date Management: Native JavaScript Date

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure database in `app.module.ts`
4. Run migrations: `npm run typeorm:run-migrations`
5. Start the server: `npm run start:dev`

## Future Enhancements

1. Authentication & Authorization
2. Input Validation Enhancement
3. Rate Limiting
4. API Documentation (Swagger)
5. Unit & Integration Tests
6. Logging System
7. Caching Layer
8. Real-time Notifications
