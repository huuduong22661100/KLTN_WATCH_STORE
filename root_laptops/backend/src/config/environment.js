import dotenv from 'dotenv';


dotenv.config();


const config = {
  
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/Watch_store',
  
  
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  
  
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || '10MB',
  UPLOAD_PATH: process.env.UPLOAD_PATH || 'uploads/',
};

export default config;
