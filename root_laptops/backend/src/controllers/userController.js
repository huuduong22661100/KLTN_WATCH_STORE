import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Đăng ký người dùng mới
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Kiểm tra người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'user đã tồn tại'
      });
    }

    // create new
    const user = new User({
      name,
      email,
      password_hash: password, 
      phone,
      address
    });

    await user.save();

    //  JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          avatar_url: user.avatar_url
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Debug logging (temporary) - do NOT log passwords in production
    console.log(`[login] attempt for email=${email}`);
    // tìm người dùng theo mail
    const user = await User.findOne({ email });
    console.log('[login] user found:', !!user);
    if (!user) {
      console.log('[login] no user with that email');
      return res.status(401).json({
        success: false,
        message: 'Thông tin xác thực không hợp lệ'
      });
    }

    // check mk 
    const isPasswordValid = await user.comparePassword(password);
    console.log('[login] password valid:', !!isPasswordValid);
    if (!isPasswordValid) {
      console.log('[login] invalid password for email=', email);
      return res.status(401).json({
        success: false,
        message: 'Thông tin xác thực không hợp lệ'
      });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Đăng Nhập Thành Công',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          avatar_url: user.avatar_url,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Đăng Nhập Thất Bại',
      error: error.message
    });
  }
};

// Lấy thông tin profile người dùng
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password_hash');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi lấy thông tin profile',
      error: error.message
    });
  }
};

// update profile người dùng
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, avatar_url } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, address, avatar_url },
      { new: true, runValidators: true }
    ).select('-password_hash');

    res.json({
      success: true,
      message: 'Update Profile Thành Công',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi Update Profile',
      error: error.message
    });
  }
};

// ✅ Lấy tất cả người dùng (Admin only)
export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const users = await User.find()
      .select('-password_hash')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    res.json({
      success: true,
      data: users,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách người dùng',
      error: error.message
    });
  }
};

// ✅ Lấy thông tin 1 user theo ID (Admin only)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password_hash');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin người dùng',
      error: error.message
    });
  }
};

// ✅ Cập nhật thông tin user (Admin only)
export const updateUser = async (req, res) => {
  try {
    const { name, phone, address, avatar_url, role, password } = req.body;

    // Tìm user bằng ID
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    // Cập nhật các trường
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.avatar_url = avatar_url || user.avatar_url;
    user.role = role || user.role;

    // Nếu có mật khẩu mới, cập nhật nó
    if (password) {
      user.password_hash = password;
    }

    // Lưu user, middleware sẽ tự động hash password
    const updatedUser = await user.save();

    // Loại bỏ password_hash khỏi response
    const userResponse = updatedUser.toObject();
    delete userResponse.password_hash;

    res.json({
      success: true,
      message: 'Cập nhật người dùng thành công',
      data: userResponse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật người dùng',
      error: error.message
    });
  }
};

// ✅ Xóa user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    res.json({
      success: true,
      message: 'Xóa người dùng thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa người dùng',
      error: error.message
    });
  }
};
