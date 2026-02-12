# Backend API - Hệ thống Quản lý Tài liệu Đảng

Backend API cho hệ thống quản lý tài liệu chính trị của Đảng.

## 🚧 Trạng thái: Chưa phát triển

Folder này được tạo sẵn để chuẩn bị cho việc phát triển backend sau này.

## 📋 Kế hoạch phát triển

### Tech Stack đề xuất

**Option 1: Express.js (Đơn giản, linh hoạt)**
```
- Node.js + Express
- TypeScript
- PostgreSQL + Prisma ORM
- JWT Authentication
- Multer (upload files)
- Express Validator
```

**Option 2: NestJS (Enterprise, có cấu trúc)**
```
- NestJS Framework
- TypeScript
- PostgreSQL + TypeORM
- Passport JWT
- Swagger API Docs
- Class Validator
```

### Cấu trúc dự kiến (Express)

```
backend/
├── src/
│   ├── config/           # Database, env config
│   ├── controllers/      # Route handlers
│   ├── middleware/       # Auth, validation
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Helper functions
│   └── index.ts          # Entry point
├── uploads/              # File storage
├── .env.example
├── package.json
└── tsconfig.json
```

### API Endpoints cần có

#### Authentication
```
POST   /api/auth/login       # Đăng nhập
POST   /api/auth/logout      # Đăng xuất
POST   /api/auth/refresh     # Refresh token
GET    /api/auth/me          # Thông tin user hiện tại
```

#### Documents
```
GET    /api/documents                    # Danh sách tài liệu
GET    /api/documents/:id                # Chi tiết tài liệu
POST   /api/documents                    # Tạo tài liệu mới
PUT    /api/documents/:id                # Cập nhật tài liệu
DELETE /api/documents/:id                # Xóa tài liệu
POST   /api/documents/:id/submit         # Nộp lên cấp trên
POST   /api/documents/:id/approve        # Phê duyệt
POST   /api/documents/:id/reject         # Từ chối
POST   /api/documents/upload             # Upload file
```

#### Reviews
```
GET    /api/reviews                      # Danh sách đánh giá
GET    /api/reviews/:id                  # Chi tiết đánh giá
POST   /api/reviews                      # Tạo đánh giá
PUT    /api/reviews/:id                  # Cập nhật đánh giá
DELETE /api/reviews/:id                  # Xóa đánh giá
```

#### Reports
```
GET    /api/reports/documents            # Báo cáo thống kê tài liệu
GET    /api/reports/usage                # Báo cáo sử dụng
GET    /api/reports/export               # Xuất báo cáo
```

#### Users
```
GET    /api/users                        # Danh sách user
GET    /api/users/:id                    # Chi tiết user
POST   /api/users                        # Tạo user
PUT    /api/users/:id                    # Cập nhật user
DELETE /api/users/:id                    # Xóa user
```

### Database Schema

#### Users Table
```sql
- id (UUID)
- username (unique)
- password (hashed)
- full_name
- email
- role (supervisor/subordinate)
- organization
- created_at
- updated_at
```

#### Documents Table
```sql
- id (UUID)
- code (unique)
- title
- type (VAN_BAN/SACH/AUDIO/VIDEO/HINH_ANH)
- classification
- authors (JSON)
- content_data (JSON)
- status (draft/pending/approved/rejected)
- created_by (user_id)
- created_at
- updated_at
- approved_by (user_id, nullable)
- approved_at (nullable)
```

#### Reviews Table
```sql
- id (UUID)
- document_id (foreign key)
- reviewer_id (foreign key)
- rating (1-5)
- content
- created_at
- updated_at
```

### Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/party_documents

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# File Upload
MAX_FILE_SIZE=50MB
UPLOAD_PATH=./uploads

# CORS
FRONTEND_URL=http://localhost:3000
```

## 🚀 Khi bắt đầu phát triển

### 1. Setup Express + TypeScript

```bash
cd backend
npm init -y
npm install express cors dotenv multer bcrypt jsonwebtoken
npm install -D typescript @types/node @types/express @types/cors ts-node nodemon
npx tsc --init
```

### 2. Setup Database (Prisma)

```bash
npm install prisma @prisma/client
npx prisma init
# Edit schema.prisma
npx prisma migrate dev
```

### 3. Tạo cấu trúc folders

```bash
mkdir -p src/{config,controllers,middleware,models,routes,services,utils}
```

### 4. Chạy development

```bash
npm run dev
```

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [NestJS Documentation](https://nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [JWT Best Practices](https://jwt.io/)

## 🔗 Kết nối với Frontend

Frontend sẽ gọi API thông qua:
```typescript
// frontend/src/config/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

Cần tạo file `.env` trong frontend:
```env
VITE_API_URL=http://localhost:5000/api
```
