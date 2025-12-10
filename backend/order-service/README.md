# Order Service

Order management microservice for the Scan_n_eat project.

## Features

- **Create Order** - `POST /orders`
- **Get Order by ID** - `GET /orders/{id}`
- **Get User Orders** - `GET /orders/user/{userId}`
- **Automatic Total Price Calculation**

## Tech Stack

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL
- Lombok

## Database

**Database Name:** `order_db`

**Table: orders**
| Column | Type |
|--------|------|
| id | UUID (PK) |
| user_id | UUID |
| total_price | DECIMAL |
| status | ENUM (PENDING, COMPLETED) |
| created_at | TIMESTAMP |

**Table: order_items**
| Column | Type |
|--------|------|
| id | SERIAL (PK) |
| order_id | UUID (FK → orders.id) |
| ingredient_id | INTEGER |
| quantity | INTEGER |
| price_at_purchase | DECIMAL |

## Configuration

Edit `src/main/resources/application.yml`:

```yaml
server:
  port: 8082

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/order_db
    username: postgres
    password: your_password
```

## Running the Service

```bash
# Build
./mvnw clean package -DskipTests

# Run
java -jar target/order-service-0.0.1-SNAPSHOT.jar

# Or run with Maven
./mvnw spring-boot:run
```

## API Endpoints

### Create Order
```
POST http://localhost:8082/orders
Content-Type: application/json

{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "items": [
    {
      "ingredientId": 1,
      "quantity": 2,
      "priceAtPurchase": 5.99
    },
    {
      "ingredientId": 2,
      "quantity": 1,
      "priceAtPurchase": 3.50
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "id": "generated-uuid",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "totalPrice": 15.48,
  "status": "PENDING",
  "createdAt": "2025-12-09T22:00:00",
  "items": [...]
}
```

### Get Order by ID
```
GET http://localhost:8082/orders/{orderId}
```

### Get User Orders
```
GET http://localhost:8082/orders/user/{userId}
```

## Project Structure

```
src/main/java/com/scan_neat/order_service/
├── OrderServiceApplication.java
├── controller/
│   └── OrderController.java
├── dto/
│   ├── CreateOrderRequest.java
│   ├── OrderItemRequest.java
│   ├── OrderItemResponse.java
│   └── OrderResponse.java
├── model/
│   ├── Order.java
│   ├── OrderItem.java
│   └── OrderStatus.java
├── repository/
│   ├── OrderItemRepository.java
│   └── OrderRepository.java
└── service/
    └── OrderService.java
```

## Testing with PowerShell

```powershell
# Create Order
(Invoke-WebRequest -Uri "http://localhost:8082/orders" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"userId":"550e8400-e29b-41d4-a716-446655440000","items":[{"ingredientId":1,"quantity":2,"priceAtPurchase":5.99}]}').Content

# Get Order
(Invoke-WebRequest -Uri "http://localhost:8082/orders/{order-id}" -Method GET).Content

# Get User Orders
(Invoke-WebRequest -Uri "http://localhost:8082/orders/user/{user-id}" -Method GET).Content
```
