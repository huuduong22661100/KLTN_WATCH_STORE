# 🎯 ADMIN PANEL - WATCH STORE

Hệ thống quản trị viên cho cửa hàng đồng hồ với giao diện hiện đại và đầy đủ chức năng.

## ✨ Tính năng đã hoàn thành

### 📊 Dashboard
- Thống kê tổng quan (doanh thu, sản phẩm, đơn hàng, người dùng)
- Danh sách sản phẩm sắp hết hàng
- Đơn hàng chờ xác nhận
- Top sản phẩm bán chạy
- Biểu đồ xu hướng tăng trưởng

### 📦 Quản lý sản phẩm (Products)
- ✅ Xem danh sách sản phẩm (có pagination)
- ✅ Tìm kiếm sản phẩm
- ✅ Xem chi tiết sản phẩm
- ✅ Thêm sản phẩm mới (TODO: cần tạo form)
- ✅ Sửa sản phẩm (TODO: cần tạo form)
- ✅ Xóa sản phẩm (với confirm dialog)
- ✅ Hiển thị hình ảnh, giá, tồn kho, thương hiệu
- ✅ Cảnh báo sản phẩm sắp hết hàng (stock < 10)

### 🛒 Quản lý đơn hàng (Orders)
- ✅ Xem danh sách đơn hàng (có pagination)
- ✅ Lọc theo trạng thái (pending, confirmed, processing, shipping, delivered, cancelled)
- ✅ Cập nhật trạng thái đơn hàng
- ✅ Xem thông tin khách hàng, tổng tiền, ngày đặt
- ✅ Badge màu theo trạng thái
- ✅ Xem chi tiết đơn hàng (TODO: tạo trang chi tiết)

### 👥 Quản lý người dùng (Users)
- ✅ Xem danh sách người dùng (có pagination)
- ✅ Phân quyền (User/Admin)
- ✅ Xóa người dùng (với confirm dialog)
- ✅ Hiển thị tên, email, số điện thoại, ngày tạo
- ✅ Badge phân biệt Admin/User

### 📁 Quản lý danh mục (Categories)
- ✅ Xem danh sách danh mục
- ✅ Thêm danh mục mới (dialog form)
- ✅ Sửa danh mục (dialog form)
- ✅ Xóa danh mục (với confirm dialog)
- ✅ Trường: tên, slug, mô tả, hình ảnh

### 🎨 Quản lý màu sắc (Colors)
- ✅ Xem danh sách màu sắc
- ✅ Thêm màu mới (dialog form với color picker)
- ✅ Sửa màu (dialog form)
- ✅ Xóa màu (với confirm dialog)
- ✅ Hiển thị preview màu

## 🛠️ Công nghệ sử dụng

- **Framework**: Next.js 15.4.6 (App Router)
- **Language**: TypeScript
- **UI Library**: Shadcn/ui + Radix UI
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

## 📁 Cấu trúc dự án

```
admin/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Auth routes
│   │   ├── (main)/              # Main app routes
│   │   │   └── dashboard/       # Dashboard pages
│   │   │       ├── page.tsx     # Dashboard overview
│   │   │       ├── products/    # Products management
│   │   │       ├── orders/      # Orders management
│   │   │       ├── users/       # Users management
│   │   │       ├── categories/  # Categories management
│   │   │       ├── colors/      # Colors management
│   │   │       └── news/        # News management
│   │   └── layout.tsx           # Root layout
│   ├── features/                # Feature modules
│   │   ├── products/
│   │   │   ├── api.ts          # API functions
│   │   │   ├── hooks/          # React Query hooks
│   │   │   └── components/     # Feature components
│   │   ├── orders/
│   │   ├── users/
│   │   ├── categories/
│   │   └── colors/
│   ├── shared/
│   │   ├── components/         # Shared components
│   │   │   └── ui/            # UI components
│   │   ├── types/             # TypeScript types
│   │   └── utils/             # Utilities
│   ├── constants/             # Constants & API URLs
│   ├── providers/             # React providers
│   └── store/                 # Zustand stores
├── public/                    # Static assets
└── package.json
```

## 🚀 Cài đặt và chạy

### 1. Cài đặt dependencies
```bash
cd admin
npm install
```

### 2. Cấu hình môi trường
Tạo file `.env` với nội dung:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 3. Chạy development server
```bash
npm run dev
```

Admin panel sẽ chạy tại: `http://localhost:3001`

## 📝 API Endpoints đã tích hợp

### Products
- `GET /api/v1/products` - Lấy danh sách sản phẩm
- `GET /api/v1/products/:id` - Lấy chi tiết sản phẩm
- `POST /api/v1/products` - Tạo sản phẩm mới
- `PUT /api/v1/products/:id` - Cập nhật sản phẩm
- `DELETE /api/v1/products/:id` - Xóa sản phẩm

### Orders
- `GET /api/v1/orders` - Lấy danh sách đơn hàng
- `GET /api/v1/orders/:id` - Lấy chi tiết đơn hàng
- `PATCH /api/v1/orders/:id/status` - Cập nhật trạng thái

### Users
- `GET /api/v1/users` - Lấy danh sách người dùng
- `GET /api/v1/users/:id` - Lấy chi tiết người dùng
- `PUT /api/v1/users/:id` - Cập nhật người dùng
- `DELETE /api/v1/users/:id` - Xóa người dùng

### Categories
- `GET /api/v1/categories` - Lấy danh sách danh mục
- `POST /api/v1/categories` - Tạo danh mục mới
- `PUT /api/v1/categories/:id` - Cập nhật danh mục
- `DELETE /api/v1/categories/:id` - Xóa danh mục

### Colors
- `GET /api/v1/colors` - Lấy danh sách màu sắc
- `POST /api/v1/colors` - Tạo màu mới
- `PUT /api/v1/colors/:id` - Cập nhật màu
- `DELETE /api/v1/colors/:id` - Xóa màu

## 🎨 Giao diện

### Dashboard
- Layout với Sidebar navigation
- Cards thống kê với icons và màu sắc
- Responsive design (mobile-friendly)
- Dark mode ready (chưa implement)

### Data Tables
- Pagination component
- Search và filter
- Action buttons (View, Edit, Delete)
- Confirm dialogs cho delete actions
- Loading và error states

### Forms
- Dialog modals cho Create/Edit
- Form validation với React Hook Form
- Toast notifications (success/error)
- Color picker cho Colors management

## 📌 TODO - Cần hoàn thiện

1. **Products Management**
   - [ ] Tạo form thêm/sửa sản phẩm đầy đủ
   - [ ] Upload hình ảnh sản phẩm
   - [ ] Trang chi tiết sản phẩm

2. **Orders Management**
   - [ ] Trang chi tiết đơn hàng
   - [ ] In hóa đơn
   - [ ] Export orders to Excel

3. **Users Management**
   - [ ] Form thêm user mới
   - [ ] Form edit user profile
   - [ ] Reset password

4. **Dashboard**
   - [ ] Biểu đồ doanh thu theo tháng
   - [ ] Thống kê chi tiết hơn

5. **General**
   - [ ] Authentication & Authorization
   - [ ] Dark mode
   - [ ] Export data
   - [ ] Import data
   - [ ] Activity logs

## 🎯 Hướng dẫn sử dụng

### Quản lý sản phẩm
1. Vào **Products** từ sidebar
2. Tìm kiếm sản phẩm bằng search box
3. Click **Thêm sản phẩm** để tạo mới (form đang TODO)
4. Click icon **Edit** để sửa sản phẩm
5. Click icon **Trash** để xóa (có confirm dialog)

### Quản lý đơn hàng
1. Vào **Orders** từ sidebar
2. Lọc đơn hàng theo trạng thái
3. Click vào dropdown trạng thái để cập nhật
4. Click icon **Eye** để xem chi tiết (đang TODO)

### Quản lý người dùng
1. Vào **Users** từ sidebar
2. Click dropdown role để đổi quyền User/Admin
3. Click icon **Trash** để xóa user

### Quản lý danh mục & màu sắc
1. Vào **Categories** hoặc **Colors** từ sidebar
2. Click **Thêm** để mở dialog form
3. Điền thông tin và submit
4. Click **Edit** để sửa
5. Click **Trash** để xóa

## 🐛 Debugging

### Nếu gặp lỗi kết nối API
- Kiểm tra backend đã chạy tại port 5000
- Kiểm tra file `.env` đã cấu hình đúng
- Kiểm tra CORS trong backend

### Nếu gặp lỗi UI
- Xóa folder `.next` và chạy lại `npm run dev`
- Kiểm tra Tailwind CSS đã load đúng
- Kiểm tra console browser

## 📞 Liên hệ

Mọi thắc mắc vui lòng liên hệ qua GitHub Issues.
