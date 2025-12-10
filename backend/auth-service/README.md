# Auth Service

Authentication microservice for the Scan_n_eat project.

## Features

- **User Registration** - `POST /auth/register`
- **User Login** - `POST /auth/login`
- **JWT Token Generation** - Secure token-based authentication
- **Password Hashing** - BCrypt encryption

## Tech Stack

- Java 17
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT (jjwt 0.11.5)
- Lombok

## Database

**Database Name:** `authdb`

**Table: users**
| Column | Type |
|--------|------|
| user_id | UUID (PK) |
| username | VARCHAR (unique) |
| password_hash | VARCHAR |
| role | ENUM (USER, ADMIN) |
| created_at | TIMESTAMP WITH TIME ZONE |

## Configuration

Edit `src/main/resources/application.yml`:

```yaml
server:
  port: 8083

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/authdb
    username: postgres
    password: your_password
```

## Running the Service

```bash
# Build
./mvnw clean package -DskipTests

# Run
java -jar target/auth-service-0.0.1-SNAPSHOT.jar

# Or run with Maven
./mvnw spring-boot:run
```

## API Endpoints

### Register User
```
POST http://localhost:8083/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "johndoe",
  "role": "USER"
}
```

### Login User
```
POST http://localhost:8083/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "johndoe",
  "role": "USER"
}
```

## Project Structure

```
src/main/java/com/scan_neat/auth_service/
├── AuthServiceApplication.java
├── config/
│   └── ApplicationConfig.java
├── controller/
│   └── AuthController.java
├── dto/
│   ├── AuthResponse.java
│   ├── LoginRequest.java
│   └── RegisterRequest.java
├── model/
│   ├── Role.java
│   └── User.java
├── repository/
│   └── UserRepository.java
├── security/
│   ├── JwtAuthenticationFilter.java
│   ├── JwtService.java
│   └── SecurityConfig.java
└── service/
    └── AuthService.java
```

## Testing with PowerShell

```powershell
# Register
(Invoke-WebRequest -Uri "http://localhost:8083/auth/register" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"username":"testuser","password":"pass123"}').Content

# Login
(Invoke-WebRequest -Uri "http://localhost:8083/auth/login" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"username":"testuser","password":"pass123"}').Content
```
