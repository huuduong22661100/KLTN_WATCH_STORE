import Product from '../models/Product.js';
import mongoose from 'mongoose';

// 🟢 Tạo sản phẩm mới
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🟢 Lấy danh sách sản phẩm (có thể phân trang)
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, color, minPrice, maxPrice, search, sort } = req.query;
    let query = {};
    let sortOptions = {};

    // Xử lý filter theo category (category_id là array)
    if (category) {
      // Kiểm tra xem category có phải là ObjectId hợp lệ không
      if (mongoose.Types.ObjectId.isValid(category)) {
        const categoryObjectId = new mongoose.Types.ObjectId(category);
        // Sử dụng $in vì category_id là array
        query.category_id = { $in: [categoryObjectId] };
      } else {
        return res.status(400).json({ 
          success: false, 
          message: 'ID danh mục không hợp lệ' 
        });
      }
    }

    // Xử lý filter theo color (color_id là single ObjectId)
    if (color) {
      // Kiểm tra xem color có phải là ObjectId hợp lệ không
      if (mongoose.Types.ObjectId.isValid(color)) {
        query.color_id = new mongoose.Types.ObjectId(color);
      } else {
        return res.status(400).json({ 
          success: false, 
          message: 'ID màu sắc không hợp lệ' 
        });
      }
    }

    // Xử lý filter theo giá
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Xử lý tìm kiếm theo tên hoặc mô tả
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
      ];
    }

    // Xử lý sắp xếp
    if (sort) {
      switch (sort) {
        case 'price_asc':
          sortOptions.price = 1;
          break;
        case 'price_desc':
          sortOptions.price = -1;
          break;
        case 'name_asc':
          sortOptions.title = 1;
          break;
        case 'name_desc':
          sortOptions.title = -1;
          break;
        case 'newest':
          sortOptions.createdAt = -1;
          break;
        case 'oldest':
          sortOptions.createdAt = 1;
          break;
        default:
          sortOptions.createdAt = -1;
      }
    } else {
      sortOptions.createdAt = -1;
    }

    const products = await Product.find(query)
      .populate("color_id")
      .populate("category_id")
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      data: products,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Lấy chi tiết sản phẩm theo ID
export const getProductById = async (req, res) => {
  try {
    // Kiểm tra xem ID có phải là ObjectId hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID sản phẩm không hợp lệ' 
      });
    }

    const product = await Product.findById(req.params.id)
      .populate("color_id")
      .populate("category_id");

    if (!product) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
  try {
    // Kiểm tra xem ID có phải là ObjectId hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID sản phẩm không hợp lệ' 
      });
    }

    // Log request body để debug
    console.log('Update Product Request Body:', JSON.stringify(req.body, null, 2));
    
    // Validate category_id nếu có
    if (req.body.category_id) {
      if (Array.isArray(req.body.category_id)) {
        const invalidIds = req.body.category_id.filter(id => !mongoose.Types.ObjectId.isValid(id));
        if (invalidIds.length > 0) {
          return res.status(400).json({
            success: false,
            message: `Invalid category IDs: ${invalidIds.join(', ')}`
          });
        }
      }
    }

    // Validate color_id nếu có
    if (req.body.color_id && req.body.color_id !== '') {
      if (!mongoose.Types.ObjectId.isValid(req.body.color_id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid color ID'
        });
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('Error in updateProduct:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🟢 Xóa sản phẩm
export const deleteProduct = async (req, res) => {
  try {
    // Kiểm tra xem ID có phải là ObjectId hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID sản phẩm không hợp lệ' 
      });
    }

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json({ success: true, message: "Xóa sản phẩm thành công" });
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
