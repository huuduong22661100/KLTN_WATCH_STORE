# ✅ Backend Deployment Checklist

Sử dụng checklist này để đảm bảo Backend sẵn sàng deploy lên Render.

## 📋 Pre-deployment Checklist

### 1. Environment Variables
- [ ] `.env.example` đã được tạo với tất cả các biến cần thiết
- [ ] File `.env` đã được thêm vào `.gitignore`
- [ ] Không có thông tin nhạy cảm (passwords, API keys) trong code

### 2. Server Configuration
- [ ] Server lắng nghe trên `process.env.PORT`
- [ ] Default port là 5000 (hoặc tùy chọn khác)
- [ ] Server có thể khởi động với `npm start`

### 3. Database Configuration
- [ ] MongoDB URI sử dụng `process.env.MONGODB_URI`
- [ ] Đã tạo MongoDB Atlas cluster
- [ ] Đã có Connection String từ MongoDB Atlas
- [ ] Đã whitelist IP address (0.0.0.0/0 cho production)
- [ ] Đã tạo Database User với quyền read/write

### 4. CORS Configuration
- [ ] CORS đã được cấu hình trong `src/config/cors.js`
- [ ] Cho phép Frontend URL (`FRONTEND_URL`)
- [ ] Cho phép Admin URL (`ADMIN_URL`)
- [ ] Trong development mode, cho phép mọi origin

### 5. Package.json
- [ ] Có script `"start": "node src/server.js"`
- [ ] Có script `"build"` nếu cần
- [ ] Có field `"engines"` chỉ định Node version
- [ ] Tất cả dependencies được list đầy đủ

### 6. Security
- [ ] JWT_SECRET sử dụng biến môi trường
- [ ] Passwords được hash (bcryptjs)
- [ ] Validation cho user input (Joi)
- [ ] Error handler không expose sensitive info

### 7. Testing Locally
- [ ] Server chạy được với `npm start`
- [ ] Có thể kết nối database
- [ ] API endpoints hoạt động đúng
- [ ] CORS hoạt động với localhost:3000 và localhost:3001

## 🚀 Deployment Steps

### Step 1: MongoDB Atlas Setup
```bash
1. Vào https://www.mongodb.com/cloud/atlas
2. Tạo cluster miễn phí
3. Tạo Database User
4. Whitelist IP: 0.0.0.0/0
5. Lấy Connection String
```

### Step 2: Push Code to GitHub
```bash
git add .
git commit -m "Prepare backend for Render deployment"
git push origin main
```

### Step 3: Deploy to Render
```bash
1. Vào https://dashboard.render.com/
2. New → Web Service
3. Connect repository: KLTN_WATCH_STORE
4. Configure:
   - Name: kltn-watch-store-api
   - Root Directory: root_laptops/backend
   - Environment: Node
   - Build Command: npm install
   - Start Command: npm start
   - Instance Type: Free
5. Add Environment Variables:
   - NODE_ENV=production
   - MONGODB_URI=[your-mongodb-atlas-uri]
   - JWT_SECRET=[generate-random-string]
   - JWT_EXPIRE=7d
   - FRONTEND_URL=[will-update-later]
   - ADMIN_URL=[will-update-later]
6. Create Web Service
```

### Step 4: Verify Deployment
```bash
# Kiểm tra endpoint root
curl https://your-api.onrender.com/

# Kiểm tra health endpoint
curl https://your-api.onrender.com/health

# Kết quả mong đợi: Status 200 với JSON response
```

### Step 5: Update Frontend & Admin
```bash
# Trong Netlify:
1. Frontend site → Environment Variables
   NEXT_PUBLIC_API_URL=https://your-api.onrender.com

2. Admin site → Environment Variables
   NEXT_PUBLIC_API_URL=https://your-api.onrender.com

3. Trigger Redeploy cho cả 2 sites
```

### Step 6: Update CORS on Render
```bash
# Sau khi có URL Netlify:
1. Vào Render Dashboard
2. Environment tab
3. Update:
   FRONTEND_URL=https://your-frontend.netlify.app
   ADMIN_URL=https://your-admin.netlify.app
4. Service sẽ tự động redeploy
```

## ✅ Post-deployment Verification

- [ ] Backend URL accessible: `https://your-api.onrender.com`
- [ ] Root endpoint trả về JSON thông tin API
- [ ] Health endpoint trả về status OK
- [ ] MongoDB connection thành công (check logs)
- [ ] Frontend có thể gọi API (không có CORS error)
- [ ] Admin có thể gọi API (không có CORS error)
- [ ] Authentication hoạt động
- [ ] CRUD operations hoạt động

## 🐛 Common Issues & Solutions

### Build Failed
**Problem:** npm install fails
**Solution:** 
- Kiểm tra `package.json` syntax
- Đảm bảo tất cả dependencies hợp lệ
- Xem logs chi tiết trong Render

### Application Error
**Problem:** Service crashes sau khi deploy
**Solution:**
- Kiểm tra environment variables
- Kiểm tra MongoDB connection string
- Xem Runtime Logs trong Render

### CORS Error
**Problem:** Frontend không thể gọi API
**Solution:**
- Kiểm tra `FRONTEND_URL` chính xác (không có trailing slash)
- Kiểm tra CORS config trong `src/config/cors.js`
- Ensure protocol matches (https vs http)

### Database Connection Failed
**Problem:** Cannot connect to MongoDB
**Solution:**
- Kiểm tra `MONGODB_URI` format
- Ensure password không có ký tự đặc biệt (hoặc encode URL)
- Kiểm tra IP whitelist trên Atlas (phải có 0.0.0.0/0)

## 📊 Monitoring

- [ ] Setup monitoring cho health endpoint
- [ ] Check logs định kỳ trong Render Dashboard
- [ ] Monitor response times
- [ ] Setup alerts cho downtime

## 🎉 Deployment Complete!

Nếu tất cả checklist items đã được đánh dấu, backend của bạn đã sẵn sàng cho production! 🚀
