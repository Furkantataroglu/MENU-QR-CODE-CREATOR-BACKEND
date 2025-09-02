# QR Kod Menü API

Bu proje, restoranların menülerini QR kod ile paylaşabilmelerini sağlayan bir backend API'dir.

## Özellikler

- ✅ Kullanıcı yönetimi (CRUD)
- ✅ Menü yönetimi (CRUD)
- ✅ Yemek yönetimi (CRUD)
- ✅ QR kod otomatik oluşturma
- ✅ Public menü görüntüleme (QR kod ile erişim)
- ✅ Validation middleware
- ✅ Error handling
- ✅ PostgreSQL veritabanı
- ✅ Prisma ORM

## Teknolojiler

- **Backend**: Node.js, Express.js
- **Veritabanı**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Joi
- **QR Kod**: qrcode


## API Endpoints

### Kullanıcı İşlemleri
- `POST /api/user` - Yeni kullanıcı oluştur
- `GET /api/user` - Tüm kullanıcıları getir
- `GET /api/user/:id` - ID'ye göre kullanıcı getir
- `PUT /api/user/:id` - Kullanıcı güncelle
- `DELETE /api/user/:id` - Kullanıcı sil

### Menü İşlemleri
- `POST /api/menus` - Yeni menü oluştur (QR kod ile birlikte)
- `GET /api/menus` - Tüm menüleri getir
- `GET /api/menus/:id` - ID'ye göre menü getir
- `GET /api/users/:userId/menus` - Kullanıcıya ait menüleri getir
- `PUT /api/menus/:id` - Menü güncelle
- `DELETE /api/menus/:id` - Menü sil
- `POST /api/menus/:id/regenerate-qr` - QR kod yeniden oluştur

### Yemek İşlemleri
- `POST /api/dishes` - Yeni yemek oluştur
- `GET /api/dishes` - Tüm yemekleri getir
- `GET /api/dishes/:id` - ID'ye göre yemek getir
- `GET /api/menus/:menuId/dishes` - Menüye ait yemekleri getir
- `PUT /api/dishes/:id` - Yemek güncelle
- `DELETE /api/dishes/:id` - Yemek sil

### Public Endpoints (QR Kod ile Erişim)
- `GET /menu/:id` - Menüyü public olarak görüntüle

## Veritabanı Şeması

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

## QR Kod Sistemi

### QR Kod İçeriği
Her menü için oluşturulan QR kod şu bilgileri içerir:
```json
{
  "menuId": 1,
  "title": "Akşam Menüsü",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "dishes": [...],
  "type": "menu"
}
```