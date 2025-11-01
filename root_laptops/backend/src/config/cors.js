import cors from 'cors';

/**
 * CORS Configuration
 * Cho phép Frontend và Admin Panel truy cập Backend
 */
const corsOptions = {
  origin: function (origin, callback) {
    // Danh sách các domain được phép truy cập
    const allowedOrigins = [
      'https://kltn-watch-store.netlify.app', // Frontend production URL
      'https://admin-kltn-store-watch.netlify.app', // Admin production URL
      'http://localhost:3000', // Frontend local
      'http://localhost:3001', // Admin local
      process.env.FRONTEND_URL,
      process.env.ADMIN_URL,
    ].filter(Boolean); // Loại bỏ undefined

    // Cho phép request không có origin (mobile apps, curl, postman, server-to-server)
    if (!origin) return callback(null, true);

    // Trong development, cho phép tất cả
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    // Kiểm tra origin có trong danh sách cho phép không
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('⚠️ CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Cho phép gửi cookies
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

export default corsOptions;
