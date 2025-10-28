# Hướng dẫn Deploy Frontend lên Netlify

## Chuẩn bị

### 1. Cài đặt Netlify CLI (Optional - để deploy từ command line)
```bash
npm install -g netlify-cli
```

### 2. Tạo tài khoản Netlify
- Truy cập: https://www.netlify.com/
- Đăng ký tài khoản (có thể dùng GitHub account)

## Phương pháp 1: Deploy qua Netlify Website (Khuyến nghị)

### Bước 1: Push code lên GitHub
```bash
# Nếu chưa có git repository
git init
git add .
git commit -m "Prepare for Netlify deployment"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Bước 2: Deploy trên Netlify
1. Đăng nhập vào Netlify: https://app.netlify.com/
2. Click "Add new site" > "Import an existing project"
3. Chọn "GitHub" và authorize Netlify
4. Chọn repository: `KLTN_WATCH_STORE`
5. Cấu hình build settings:
   - **Base directory**: `root_laptops/frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 20

### Bước 3: Cấu hình Environment Variables
1. Vào "Site settings" > "Environment variables"
2. Thêm các biến môi trường:
   ```
   NEXT_PUBLIC_API_URL=<your-backend-api-url>
   ```
   Ví dụ: `https://your-backend.herokuapp.com/api/v1`

### Bước 4: Deploy
- Click "Deploy site"
- Netlify sẽ tự động build và deploy
- Site của bạn sẽ có URL dạng: `https://random-name.netlify.app`

### Bước 5: Tùy chỉnh Domain (Optional)
1. Vào "Site settings" > "Domain management"
2. Click "Options" > "Edit site name" để đổi tên subdomain
3. Hoặc thêm custom domain của riêng bạn

## Phương pháp 2: Deploy qua Netlify CLI

### Bước 1: Đăng nhập Netlify CLI
```bash
cd d:\HOCTAP\Khoa_luan_tn_2\root_laptops\frontend
netlify login
```

### Bước 2: Build dự án
```bash
npm run build
```

### Bước 3: Deploy
```bash
# Deploy thử nghiệm
netlify deploy

# Deploy production
netlify deploy --prod
```
