import Product from '../models/Product.js';

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

    if (category) {
      query.category_id = category;
    }
    if (color) {
      query.color_id = color;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
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
          sortOptions.name = 1;
          break;
        case 'name_desc':
          sortOptions.name = -1;
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
      page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Lấy chi tiết sản phẩm theo ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id })
      .populate("color_id")
      .populate("category_id");

    if (!product) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🟢 Xóa sản phẩm
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json({ success: true, message: "Xóa sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
