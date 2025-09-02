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

## Kurulum

### 1. Gereksinimler
- Node.js (v16+)
- PostgreSQL
- npm veya yarn

### 2. Projeyi klonlayın
```bash
git clone <repository-url>
cd QR_API
```

### 3. Bağımlılıkları yükleyin
```bash
npm install
```

### 4. Environment variables
`.env` dosyası oluşturun:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/qr_menu_db"
PORT=3001
```

### 5. Veritabanını hazırlayın
```bash
# Prisma migration
npx prisma migrate dev

# Veritabanı seed (opsiyonel)
npx prisma db seed
```

### 6. Uygulamayı çalıştırın
```bash
# Development
npm run dev

# Production
npm start
```

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

### QR Kod URL'i
QR kod tarandığında kullanıcı şu URL'e yönlendirilir:
```
http://localhost:3000/menu/{menuId}
```

## Kullanım Örneği

### 1. Kullanıcı Oluştur
```bash
curl -X POST http://localhost:3001/api/user \
  -H "Content-Type: application/json" \
  -d '{"email": "restoran@example.com", "password": "123456"}'
```

### 2. Menü Oluştur
```bash
curl -X POST http://localhost:3001/api/menus \
  -H "Content-Type: application/json" \
  -d '{"title": "Akşam Menüsü", "userId": 1}'
```

### 3. Yemek Ekle
```bash
curl -X POST http://localhost:3001/api/dishes \
  -H "Content-Type: application/json" \
  -d '{"name": "Kebap", "description": "Özel soslu kebap", "price": 45.50, "menuId": 1}'
```

### 4. QR Kod ile Menü Görüntüle
```
http://localhost:3001/menu/1
```

## Geliştirme

### Scripts
```bash
npm run dev          # Development mode
npm start            # Production mode
npm test             # Test çalıştır
```

### Prisma Komutları
```bash
npx prisma generate  # Prisma client oluştur
npx prisma migrate dev # Migration oluştur ve uygula
npx prisma studio    # Veritabanı GUI
```

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
