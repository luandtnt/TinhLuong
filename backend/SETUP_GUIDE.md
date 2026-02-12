# 🚀 Hướng dẫn Setup Backend

## Bước 1: Cài đặt dependencies

```bash
cd backend
npm install
```

## Bước 2: Khởi động PostgreSQL với Docker

```bash
# Từ root folder
docker-compose up -d
```

Kiểm tra PostgreSQL đã chạy:
```bash
docker ps
```

## Bước 3: Tạo file .env

```bash
cd backend
copy .env.example .env
```

Nội dung `.env`:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://payroll_user:payroll_pass@localhost:5432/payroll_db?schema=public"
FRONTEND_URL=http://localhost:3000
USE_MOCK_AUTH=true
```

## Bước 4: Chạy Prisma migrations

```bash
# Generate Prisma Client
npm run prisma:generate

# Chạy migrations (tạo tables)
npm run prisma:migrate

# Seed data mẫu
npm run prisma:seed
```

## Bước 5: Chạy backend

```bash
npm run dev
```

Backend sẽ chạy tại: **http://localhost:5000**

## Kiểm tra API

Mở browser hoặc Postman:

- **GET** http://localhost:5000/api/departments
- **GET** http://localhost:5000/api/employees

## Prisma Studio (xem database)

```bash
npm run prisma:studio
```

Mở: http://localhost:5555

## Troubleshooting

### Lỗi: Port 5432 đã được sử dụng

PostgreSQL local đang chạy. Tắt đi hoặc đổi port trong docker-compose.yml

```bash
# Windows - Tắt PostgreSQL service
net stop postgresql-x64-15
```

### Lỗi: Cannot connect to database

Kiểm tra Docker container:
```bash
docker logs payroll-postgres
```

### Reset database

```bash
# Xóa tất cả data
npm run prisma:migrate reset

# Seed lại
npm run prisma:seed
```

## Cấu trúc Backend

```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── modules/
│   │   ├── departments/   # API đơn vị
│   │   ├── employees/     # API nhân viên
│   │   ├── timesheets/    # API chấm công
│   │   ├── ot/            # API OT
│   │   ├── clawbacks/     # API truy thu
│   │   ├── payroll/       # API tính lương
│   │   └── configs/       # API cấu hình
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── app.module.ts
│   └── main.ts
├── .env
├── package.json
└── tsconfig.json
```

## Next Steps

Sau khi backend chạy thành công:

1. ✅ Test API endpoints
2. ✅ Xem data trong Prisma Studio
3. ⏭️ Tích hợp với Frontend (Phase 2)
