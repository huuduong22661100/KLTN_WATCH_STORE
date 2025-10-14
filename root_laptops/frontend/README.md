# Watch Store - Frontend

This is the customer-facing frontend for the Watch Store e-commerce application. It is built with Next.js and TypeScript.

## Features

- Product browsing and searching
- User authentication
- Shopping cart and checkout
- Order history

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- ShadCN UI
- React Hook Form
- Zustand (State Management)
- React Query (Data Fetching)

---

## 🔐 Authentication Flow

### **1. Cơ chế hoạt động**

```
User Login
    ↓
API Call (POST /api/v1/users/login)
    ↓
Backend trả về: { user, token }
    ↓
Frontend lưu vào Zustand Store
    ↓
Zustand Persist → localStorage
    ↓
Token được dùng cho các request sau
```

---

### **2. Token Management**

#### **Lưu trữ Token**
```typescript
// Zustand + Persist Middleware
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (user, token) => {
        set({ user, token, isAuthenticated: true });
      },
    }),
    {
      name: 'user-auth-storage', // Key trong localStorage
    }
  )
);
```

**Storage Location**: `localStorage.getItem('user-auth-storage')`

**Data Structure**:
```json
{
  "state": {
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "isAuthenticated": true
  },
  "version": 0
}
```

---

#### **Sử dụng Token trong API Calls**

```typescript
// Tự động thêm token vào headers
const token = useAuthStore.getState().token;

fetch('http://localhost:5000/api/v1/users/profile', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

---

### **3. Session Management**

#### **Không có Server-Side Session** ❌
- Frontend này **KHÔNG dùng cookie-based session**
- Dùng **JWT Token** thay thế

#### **Token Lifecycle**

```
User Login
    ↓
Token được lưu vào localStorage (Persistent)
    ↓
Mỗi lần user reload page → Zustand tự động restore từ localStorage
    ↓
Token hết hạn? → API trả lỗi 401
    ↓
Frontend logout user → Xóa token khỏi store + localStorage
```

---

### **4. Authentication State Flow**

#### **a) Login Process**

```typescript
// 1. User nhập email/password
const { mutate: login } = useLogin();

login({ email, password }, {
  onSuccess: (data) => {
    // 2. Lưu user + token vào store
    login(data.data.user, data.data.token);
    
    // 3. Redirect về trang chủ
    router.push('/');
  }
});
```

#### **b) Auto-Login (Page Reload)**

```typescript
// Zustand Persist tự động restore state từ localStorage
useEffect(() => {
  const stored = localStorage.getItem('user-auth-storage');
  if (stored) {
    // Zustand tự động parse và set state
  }
}, []);
```

#### **c) Protected Routes**

```typescript
// Middleware kiểm tra auth
export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
}
```

#### **d) Logout Process**

```typescript
const handleLogout = useLogout();

handleLogout(); // → logout() từ store → xóa localStorage → redirect /login
```

---

### **5. API Authentication**

#### **meApi - Get Current User**

```typescript
export const meApi = async (token: string) => {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
```

**Sử dụng**:
```typescript
const { data: user } = useCurrentUser(); // Tự động fetch với token từ store
```

---

### **6. Role-Based Access Control (RBAC)**

#### **Frontend chỉ cho phép `role: 'user'`**

```typescript
login: (user, token) => {
  // ⚠️ CHẶN ADMIN
  if (user.role === 'admin') {
    throw new Error('Tài khoản Admin vui lòng đăng nhập tại trang quản trị');
  }
  set({ user, token, isAuthenticated: true });
}
```

**Phân quyền**:
- **User** → Truy cập Frontend (localhost:3000)
- **Admin** → Bị chặn, phải đăng nhập tại Admin Panel (localhost:3001)

---

### **7. Security Considerations**

#### **✅ Implemented**
- Token stored in `localStorage` (XSS vulnerable nhưng dễ implement)
- Role validation trước khi login
- Token sent via `Authorization: Bearer` header
- Automatic token cleanup on logout

#### **⚠️ Recommendations**
- [ ] Implement token refresh mechanism
- [ ] Add token expiration check in frontend
- [ ] Consider using `httpOnly` cookies (cần backend support)
- [ ] Add CSRF protection nếu dùng cookies
- [ ] Rate limiting cho login attempts

---

### **8. Troubleshooting**

#### **Token bị mất sau reload?**
```bash
# Kiểm tra localStorage
localStorage.getItem('user-auth-storage')

# Nếu null → Zustand persist không hoạt động
# Fix: Kiểm tra persist middleware config
```

#### **API trả 401 Unauthorized?**
```typescript
// Token hết hạn hoặc invalid
// Frontend cần logout user
if (response.status === 401) {
  useAuthStore.getState().logout();
  router.push('/login');
}
```

#### **User đăng nhập nhưng không redirect?**
```typescript
// Kiểm tra trong LoginForm
login(formData, {
  onSuccess: () => {
    router.push('/'); // ← Cần có dòng này
  }
});
```

---

## 📁 Auth File Structure

```
src/
├── store/
│   └── authStore.ts              # Zustand store (user, token, isAuthenticated)
│
├── features/auth/
│   ├── api.ts                    # API functions (loginApi, registerApi, meApi)
│   ├── types/
│   │   └── index.ts              # User, LoginResponse interfaces
│   ├── hooks/
│   │   ├── useLogin.ts           # useMutation hook cho login
│   │   ├── useRegister.ts        # useMutation hook cho register
│   │   ├── useLogout.ts          # Logout function
│   │   └── useCurrentUser.ts    # useQuery hook fetch user info
│   └── components/
│       ├── LoginForm.tsx         # Form đăng nhập
│       └── RegisterForm.tsx      # Form đăng ký
│
└── providers/
    └── AuthProvider.tsx          # Wrapper component (hiện tại rỗng)
```

---

## 🔗 Related Documentation

- **Admin Panel**: `../admin/README.md` (Role-based authentication)
- **Backend API**: API documentation cho auth endpoints
- **Zustand Docs**: https://docs.pmnd.rs/zustand/getting-started/introduction
- **React Query**: https://tanstack.com/query/latest

---

## 🚀 Quick Start Auth Testing

```bash
# 1. Start backend
cd backend
npm run dev  # Port 5000

# 2. Start frontend
cd frontend
npm run dev  # Port 3000

# 3. Test login
# URL: http://localhost:3000/login
# User: user@example.com (role: user) ✅
# Admin: admin@example.com (role: admin) ❌ Bị chặn
```

---

## 📝 Notes

- **Token không có expiration check ở frontend** → Cần implement
- **Refresh token chưa có** → User phải login lại khi token hết hạn
- **localStorage có thể bị XSS** → Cân nhắc dùng httpOnly cookies cho production