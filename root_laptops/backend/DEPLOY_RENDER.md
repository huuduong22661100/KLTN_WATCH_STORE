# 🚀 Hướng dẫn Deploy Backend lên Render

## 📋 Chuẩn bị trước khi Deploy

### 1. Database Setup (MongoDB Atlas)

1. Truy cập [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Tạo tài khoản miễn phí
3. Tạo một Cluster mới (chọn gói FREE)
4. Tạo Database User:
   - Database Access → Add New Database User
   - Chọn Password authentication
   - Lưu lại username và password
5. Whitelist IP Address:
   - Network Access → Add IP Address
   - Chọn "Allow Access from Anywhere" (0.0.0.0/0)
6. Lấy Connection String:
   - Clusters → Connect → Connect your application
   - Copy connection string (dạng: `mongodb+srv://username:password@cluster.mongodb.net/Watch_store`)
   - Thay thế `<password>` bằng password thực tế
   - Thay thế database name nếu cần

### 2. Kiểm tra Code

Đảm bảo các điểm sau:
- ✅ `package.json` có script `"start": "node src/server.js"`
- ✅ Server lắng nghe trên `process.env.PORT`
- ✅ MongoDB URI sử dụng biến môi trường `process.env.MONGODB_URI`
- ✅ CORS đã được cấu hình đúng

## 🌐 Deploy lên Render

### Bước 1: Tạo Web Service

1. Truy cập [Render Dashboard](https://dashboard.render.com/)
2. Đăng nhập bằng GitHub account
3. Click **New** → **Web Service**
4. Kết nối repository: `KLTN_WATCH_STORE`
5. Cấu hình như sau:

| Trường | Giá trị |
|--------|---------|
| **Name** | `kltn-watch-store-api` (hoặc tên bạn muốn) |
| **Region** | `Singapore` (hoặc gần bạn nhất) |
| **Branch** | `main` |
| **Root Directory** | `root_laptops/backend` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### Bước 2: Thêm Environment Variables

Click **Advanced** → **Add Environment Variable** và thêm các biến sau:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Watch_store?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-production-version
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend.netlify.app
ADMIN_URL=https://your-admin.netlify.app
```

**Lưu ý:**
- `MONGODB_URI`: Thay bằng connection string từ MongoDB Atlas
- `JWT_SECRET`: Tạo một chuỗi ngẫu nhiên mạnh cho production
- `FRONTEND_URL` và `ADMIN_URL`: Thay bằng URL Netlify của bạn sau khi deploy Frontend/Admin

### Bước 3: Deploy

1. Click **Create Web Service**
2. Render sẽ tự động:
   - Clone repository
   - Chạy `npm install`
   - Chạy `npm start`
   - Deploy service

### Bước 4: Kiểm tra Deploy

Sau khi deploy thành công:
1. Bạn sẽ nhận được URL dạng: `https://kltn-watch-store-api.onrender.com`
2. Truy cập URL để kiểm tra:
   ```
   https://kltn-watch-store-api.onrender.com
   ```
3. Bạn sẽ thấy response JSON:
   ```json
   {
     "success": true,
     "message": "Watch Store E-commerce API",
     "version": "1.0.0",
     "endpoints": {
       "products": "/api/v1/products",
       "users": "/api/v1/users",
       "cart": "/api/v1/cart",
       "orders": "/api/v1/orders"
     }
   }
   ```

## 🔄 Cập nhật CORS sau khi có URL Frontend/Admin

1. Quay lại Render Dashboard
2. Chọn Web Service của bạn
3. Vào **Environment** tab
4. Cập nhật các biến:
   ```
   FRONTEND_URL=https://your-actual-frontend.netlify.app
   ADMIN_URL=https://your-actual-admin.netlify.app
   ```
5. Service sẽ tự động redeploy

## 📝 Cập nhật Frontend & Admin Panel

Sau khi có URL Backend, cập nhật biến môi trường trên Netlify:

### Frontend:
```env
NEXT_PUBLIC_API_URL=https://kltn-watch-store-api.onrender.com
```

### Admin Panel:
```env
NEXT_PUBLIC_API_URL=https://kltn-watch-store-api.onrender.com
```

## ⚠️ Lưu ý quan trọng

### Free Tier Limitations:
- **Sleep after inactivity**: Service sẽ "ngủ" sau 15 phút không hoạt động
- **Wake up time**: Mất 30-60 giây để "thức dậy" khi có request đầu tiên
- **Solutions**:
  - Sử dụng cron job để ping service mỗi 10-14 phút
  - Nâng cấp lên paid plan nếu cần

### Monitoring:
- Xem logs tại Render Dashboard → Service → Logs
- Kiểm tra database connection
- Theo dõi response time

## 🐛 Troubleshooting

### Build Failed:
- Kiểm tra `package.json` có đầy đủ dependencies
- Kiểm tra Node version trong `engines` field
- Xem logs để tìm lỗi cụ thể

### Application Error:
- Kiểm tra Environment Variables
- Kiểm tra MongoDB URI connection string
- Kiểm tra logs để xem lỗi runtime

### CORS Error:
- Đảm bảo `FRONTEND_URL` và `ADMIN_URL` đúng
- Kiểm tra không có trailing slash (/) ở cuối URL
- Kiểm tra protocol (http vs https)

## 🎉 Hoàn thành!

Backend của bạn đã được deploy thành công! 

**URL API của bạn:** `https://kltn-watch-store-api.onrender.com`

Tiếp theo, hãy cập nhật Frontend và Admin Panel để sử dụng URL này.
