# QR Code Menu API

This project is a backend API that enables restaurants to share their menus via QR codes.

## Features

- ✅ User management (CRUD)
- ✅ Menu management (CRUD)
- ✅ Dish management (CRUD)
- ✅ Automatic QR code generation
- ✅ Public menu viewing (accessible via QR code)
- ✅ Validation middleware
- ✅ Error handling
- ✅ PostgreSQL database
- ✅ Prisma ORM

## Technologies

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Joi
- **QR Code**: qrcode


## API Endpoints

### User Operations
- `POST /api/user` - Create a new user
- `GET /api/user` - Get all users
- `GET /api/user/:id` - Get a user by ID
- `PUT /api/user/:id` - Update a user
- `DELETE /api/user/:id` - Delete a user

### Menu Operations
- `POST /api/menus` - Create a new menu (with QR code)
- `GET /api/menus` - Get all menus
- `GET /api/menus/:id` - Get a menu by ID
- `GET /api/users/:userId/menus` - Get menus for a specific user
- `PUT /api/menus/:id` - Update a menu
- `DELETE /api/menus/:id` - Delete a menu
- `POST /api/menus/:id/regenerate-qr` - Regenerate QR code

### Dish Operations
- `POST /api/dishes` - Create a new dish
- `GET /api/dishes` - Get all dishes
- `GET /api/dishes/:id` - Get a dish by ID
- `GET /api/menus/:menuId/dishes` - Get dishes for a specific menu
- `PUT /api/dishes/:id` - Update a dish
- `DELETE /api/dishes/:id` - Delete a dish

### Public Endpoints (QR Code Access)
- `GET /menu/:id` - View a menu publicly

## Database Schema

### User Model
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  menus     Menu[]
}
```

### Menu Model
```prisma
model Menu {
  id        Int      @id @default(autoincrement())
  title     String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  dishes    Dish[]
}
```

### Dish Model
```prisma
model Dish {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  price       Decimal  @db.Decimal(10,2)
  imageUrl    String?
  createdAt   DateTime @default(now())
  menu        Menu     @relation(fields: [menuId], references: [id])
  menuId      Int
}
```

## QR Code System

### QR Code Payload
Each menu's generated QR code contains the following data:
```json
{
  "menuId": 1,
  "title": "Dinner Menu",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "dishes": [...],
  "type": "menu"
}
```