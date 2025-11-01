# 🔄 Hướng dẫn cập nhật CORS sau khi Deploy

## Khi nào cần cập nhật CORS?

Sau khi bạn deploy **Frontend** và **Admin Panel** lên Netlify, bạn sẽ nhận được URLs như:
- Frontend: `https://your-frontend-name.netlify.app`
- Admin: `https://your-admin-name.netlify.app`

Lúc này bạn cần cập nhật Backend để cho phép các URLs này truy cập API.

## 📝 Cách 1: Cập nhật qua Environment Variables (Khuyến nghị)

### Bước 1: Lấy URLs từ Netlify

1. Vào Netlify Dashboard
2. Chọn Frontend site → Copy URL (ví dụ: `https://kltn-watch-frontend.netlify.app`)
3. Chọn Admin site → Copy URL (ví dụ: `https://kltn-watch-admin.netlify.app`)

### Bước 2: Cập nhật trên Render

1. Vào [Render Dashboard](https://dashboard.render.com/)
2. Chọn Backend service của bạn
3. Vào tab **Environment**
4. Tìm và cập nhật các biến sau:

```
FRONTEND_URL=https://kltn-watch-frontend.netlify.app
ADMIN_URL=https://kltn-watch-admin.netlify.app
```

**Lưu ý:**
- ❌ KHÔNG thêm trailing slash (/) ở cuối URL
- ✅ Phải có `https://` ở đầu
- ✅ Copy chính xác URL từ Netlify

5. Sau khi cập nhật, Render sẽ tự động **redeploy** service
6. Đợi vài phút để deployment hoàn tất

### Bước 3: Kiểm tra

Test CORS bằng cách gọi API từ Frontend/Admin:

```javascript
// Test từ Console trong Frontend
fetch('https://your-backend.onrender.com/api/v1/products')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

Nếu thành công → CORS đã được cấu hình đúng! ✅

Nếu gặp lỗi CORS → Kiểm tra lại URLs trong Environment Variables.

## 📝 Cách 2: Cập nhật trực tiếp trong Code (Không khuyến nghị)

Nếu bạn muốn hardcode URLs (không linh hoạt), bạn có thể sửa file `src/config/cors.js`:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://kltn-watch-frontend.netlify.app',  // Thêm dòng này
  'https://kltn-watch-admin.netlify.app',     // Thêm dòng này
];
```

Sau đó:
1. Commit và push lên GitHub
2. Render sẽ tự động rebuild

**Nhược điểm:**
- Mỗi lần đổi URL phải commit code
- Không linh hoạt cho nhiều môi trường (staging, production)

## 🔍 Troubleshooting CORS

### Lỗi: "Access to fetch... has been blocked by CORS policy"

**Nguyên nhân:**
- Backend chưa cho phép Frontend/Admin URL
- URL trong Environment Variables sai
- Có trailing slash (/) dư thừa

**Giải pháp:**

1. **Kiểm tra Network tab trong DevTools:**
   - Mở Chrome DevTools (F12)
   - Tab Network → Tìm request bị lỗi
   - Xem headers:
     - `Origin`: URL của Frontend/Admin
     - `Access-Control-Allow-Origin`: Response từ Backend

2. **Kiểm tra Backend Logs:**
   - Vào Render Dashboard → Logs
   - Tìm dòng log khi request đến
   - Kiểm tra origin có được accept không

3. **Verify Environment Variables:**
   ```bash
   # Trong Render Dashboard → Environment
   FRONTEND_URL=https://exact-url.netlify.app  # Không có dấu / ở cuối!
   ```

4. **Test với Postman/cURL:**
   ```bash
   curl -H "Origin: https://your-frontend.netlify.app" \
        -H "Access-Control-Request-Method: GET" \
        -H "Access-Control-Request-Headers: Content-Type" \
        -X OPTIONS \
        https://your-backend.onrender.com/api/v1/products
   ```

   Kết quả mong đợi:
   ```
   Access-Control-Allow-Origin: https://your-frontend.netlify.app
   Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
   ```

### Lỗi: "Credentials flag is true, but Access-Control-Allow-Credentials is not"

**Nguyên nhân:**
- Backend CORS config có `credentials: true`
- Nhưng không set header `Access-Control-Allow-Credentials`

**Giải pháp:**
- Đảm bảo `corsOptions` trong `src/config/cors.js` có:
  ```javascript
  credentials: true,
  ```

## 🎯 Best Practices

### 1. Sử dụng Environment Variables
✅ **Good:**
```javascript
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
];
```

❌ **Bad:**
```javascript
const allowedOrigins = [
  'https://my-frontend.netlify.app', // Hardcoded
];
```

### 2. Không có Trailing Slash
✅ **Good:** `https://my-app.netlify.app`

❌ **Bad:** `https://my-app.netlify.app/`

### 3. Kiểm tra NODE_ENV
```javascript
if (process.env.NODE_ENV === 'development') {
  // Cho phép tất cả origins trong dev
  callback(null, true);
}
```

### 4. Log để Debug
Thêm logging trong CORS config:
```javascript
origin: function (origin, callback) {
  console.log('Request from origin:', origin);
  // ... rest of logic
}
```

## 📚 Additional Resources

- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Render Docs: Environment Variables](https://render.com/docs/environment-variables)
- [Express CORS Package](https://www.npmjs.com/package/cors)

## ✅ Checklist

- [ ] Đã deploy Frontend lên Netlify
- [ ] Đã deploy Admin lên Netlify
- [ ] Đã copy chính xác URLs (không có trailing slash)
- [ ] Đã cập nhật `FRONTEND_URL` trên Render
- [ ] Đã cập nhật `ADMIN_URL` trên Render
- [ ] Đã đợi Render redeploy xong
- [ ] Đã test API call từ Frontend
- [ ] Đã test API call từ Admin
- [ ] Không còn CORS error

## 🎉 Hoàn thành!

Nếu mọi thứ hoạt động tốt, bạn đã cấu hình CORS thành công! 🚀
