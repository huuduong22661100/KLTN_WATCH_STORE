import cors from 'cors';

/**
 * CORS Configuration
 * Cho phép Frontend và Admin Panel truy cập Backend
 */
const corsOptions = {
  origin: function (origin, callback) {
    // Danh sách các domain được phép truy cập
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      process.env.ADMIN_URL || 'http://localhost:3001',
      'http://localhost:3000',
      'http://localhost:3001',
      'https://kltn-watch-store.netlify.app', // Frontend production URL
      // Thêm Admin URL sau khi deploy
      // Ví dụ: 'https://your-admin.netlify.app'
    ];

    // Cho phép request không có origin (mobile apps, curl, postman)
    if (!origin) return callback(null, true);

    // Kiểm tra origin có trong danh sách cho phép không
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Trong development, cho phép tất cả
      if (process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true, // Cho phép gửi cookies
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

export default corsOptions;
