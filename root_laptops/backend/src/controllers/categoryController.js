import Category from '../models/Category.js';

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};

    if (search) {
      filter.category = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    const categories = await Category.find(filter).sort({ id: 1 });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error('Error in getCategories:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get single category
// @route   GET /api/v1/categories/:id
// @access  Public
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy danh mục' });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error('Error in getCategoryById:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
  try {
    const { category, id } = req.body;
    
    // Kiểm tra xem category đã tồn tại chưa
    const existingCategory = await Category.findOne({ category });
    if (existingCategory) {
      return res.status(400).json({ success: false, message: 'Danh mục đã tồn tại' });
    }

    const newCategory = new Category({ category, id });
    const savedCategory = await newCategory.save();
    res.status(201).json({ success: true, data: savedCategory });
  } catch (error) {
    console.error('Error in createCategory:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { category },
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy danh mục' });
    }
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    console.error('Error in updateCategory:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy danh mục' });
    }
    res.status(200).json({ success: true, message: 'Xóa danh mục thành công' });
  } catch (error) {
    console.error('Error in deleteCategory:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
