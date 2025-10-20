import Product from '../models/Product.js';
import mongoose from 'mongoose';


export const createProduct = async (req, res) => {
  try {
    
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;
    
    const product = new Product({
      ...req.body,
      id: newId
    });
    
    await product.save();
    
    
    await product.populate("color_id");
    await product.populate("category_id");
    
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, color, minPrice, maxPrice, search, sort } = req.query;
    let query = {};
    let sortOptions = {};

    
    if (category) {
      const categoryIds = category.split(',').map(id => id.trim());
      const validCategoryIds = categoryIds.filter(id => mongoose.Types.ObjectId.isValid(id));
      
      if (validCategoryIds.length > 0) {
        query.category_id = { $in: validCategoryIds.map(id => new mongoose.Types.ObjectId(id)) };
      } else {
        return res.status(400).json({ 
          success: false, 
          message: 'ID danh mục không hợp lệ' 
        });
      }
    }

    
    if (color) {
      const colorIds = color.split(',').map(id => id.trim());
      const validColorIds = colorIds.filter(id => mongoose.Types.ObjectId.isValid(id));
      
      if (validColorIds.length > 0) {
        query.color_id = { $in: validColorIds.map(id => new mongoose.Types.ObjectId(id)) };
      } else {
        return res.status(400).json({ 
          success: false, 
          message: 'ID màu sắc không hợp lệ' 
        });
      }
    }

    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
      ];
    }

    
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
      .select('-categories_id')  
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


export const getProductById = async (req, res) => {
  try {
    
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


export const updateProduct = async (req, res) => {
  try {
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID sản phẩm không hợp lệ' 
      });
    }

    
    console.log('Update Product Request Body:', JSON.stringify(req.body, null, 2));
    
    
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

    
    if (req.body.color_id) {
      if (Array.isArray(req.body.color_id)) {
        const invalidIds = req.body.color_id.filter(id => !mongoose.Types.ObjectId.isValid(id));
        if (invalidIds.length > 0) {
          return res.status(400).json({
            success: false,
            message: `Invalid color IDs: ${invalidIds.join(', ')}`
          });
        }
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("color_id")
      .populate("category_id");

    if (!product) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('Error in updateProduct:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    
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
