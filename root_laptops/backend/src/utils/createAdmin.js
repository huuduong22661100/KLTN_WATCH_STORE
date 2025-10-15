/**
 * Script tạo tài khoản admin mặc định
 * Chạy: node src/utils/createAdmin.js
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdminUser = async () => {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Thông tin admin mặc định
    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123'; // ⚠️ Đổi password này sau khi tạo

    // Kiểm tra admin đã tồn tại chưa
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('ℹ️  Admin user đã tồn tại');
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
      
      // Cập nhật role nếu chưa phải admin
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('✅ Đã cập nhật role thành admin');
      }
    } else {
      // Tạo admin mới
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      const admin = new User({
        name: 'Admin',
        email: adminEmail,
        password_hash: hashedPassword,
        role: 'admin',
        phone: '0123456789',
        address: 'Hà Nội'
      });

      await admin.save();
      console.log('✅ Đã tạo admin user thành công!');
      console.log('📧 Email:', adminEmail);
      console.log('🔑 Password:', adminPassword);
      console.log('⚠️  VUI LÒNG ĐỔI PASSWORD SAU KHI ĐĂNG NHẬP!');
    }

    await mongoose.disconnect();
    console.log('✅ Hoàn thành!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
};

createAdminUser();
