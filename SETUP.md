# 🚀 Hướng dẫn Setup sau khi cấu trúc lại

## ✅ Đã hoàn thành

Dự án đã được cấu trúc lại thành monorepo:

```
party-documents/
├── frontend/           ✅ Code React hiện tại (đã di chuyển)
├── backend/            ✅ Folder chuẩn bị cho backend
├── package.json        ✅ Root package.json
├── .gitignore          ✅ Gitignore cho monorepo
└── README.md           ✅ Documentation
```

## 📋 Các bước tiếp theo

### 1. Xóa node_modules cũ và cài đặt lại

```bash
# Xóa node_modules cũ (nếu còn)
# Bạn có thể xóa thủ công hoặc dùng lệnh:
rmdir /s /q node_modules

# Cài đặt dependencies cho root
npm install

# Cài đặt dependencies cho frontend
cd frontend
npm install
cd ..
```

### 2. Chạy Frontend

```bash
# Từ root folder
npm run dev:frontend

# Hoặc vào folder frontend
cd frontend
npm run dev
```

Frontend sẽ chạy tại: http://localhost:3000

### 3. Commit thay đổi vào Git

```bash
# Kiểm tra trạng thái
git status

# Add tất cả thay đổi
git add .

# Commit
git commit -m "Restructure project to monorepo for future backend development"

# Push lên repo (sau khi đã đổi remote)
git push origin main
```

### 4. Đổi Git Remote (nếu chưa làm)

```bash
# Xóa remote cũ
git remote remove origin

# Thêm remote mới
git remote add origin YOUR_NEW_REPO_URL

# Push lên repo mới
git push -u origin main
```

## 🔮 Khi phát triển Backend

### Option 1: Express.js (Đơn giản)

```bash
cd backend

# Cài đặt dependencies
npm install express cors dotenv multer bcrypt jsonwebtoken
npm install -D typescript @types/node @types/express ts-node nodemon

# Setup Prisma
npm install prisma @prisma/client
npx prisma init

# Tạo cấu trúc
mkdir -p src/{config,controllers,middleware,models,routes,services,utils}

# Tạo file entry point
# Tạo src/index.ts
```

### Option 2: NestJS (Enterprise)

```bash
cd backend

# Cài đặt NestJS CLI
npm i -g @nestjs/cli

# Tạo project NestJS
nest new . --skip-git

# Cài thêm dependencies
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @nestjs/typeorm typeorm pg
```

### Chạy cả Frontend + Backend

```bash
# Từ root folder
npm run dev
```

## 📝 Cấu hình Frontend để kết nối Backend

### 1. Tạo file .env trong frontend

```bash
cd frontend
copy .env.example .env
```

### 2. Sửa nội dung .env

```env
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
```

### 3. Tạo API client trong frontend

```typescript
// frontend/src/config/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  baseURL: API_URL,
  
  async request(endpoint: string, options?: RequestInit) {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
    });
    
    return response.json();
  },
  
  get: (endpoint: string) => api.request(endpoint),
  post: (endpoint: string, data: any) => 
    api.request(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint: string, data: any) => 
    api.request(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint: string) => 
    api.request(endpoint, { method: 'DELETE' }),
};
```

## 🎯 Lưu ý quan trọng

1. **Node modules cũ**: Có thể xóa thủ công folder `node_modules` ở root nếu còn
2. **Git**: Nhớ commit và push sau khi cấu trúc lại
3. **Environment variables**: Không commit file `.env` (đã có trong .gitignore)
4. **Port conflicts**: Frontend (3000), Backend (5000) - đảm bảo không bị trùng

## 🆘 Troubleshooting

### Lỗi khi chạy frontend

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Lỗi Git

```bash
# Nếu có conflict
git status
git add .
git commit -m "Fix conflicts"
```

### Lỗi Port đã được sử dụng

```bash
# Windows - Kill process trên port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 📚 Tài liệu tham khảo

- Frontend: `frontend/README.md`
- Backend: `backend/README.md`
- Root: `README.md`

---

**Hoàn thành!** Dự án đã sẵn sàng cho việc phát triển backend sau này. 🎉
