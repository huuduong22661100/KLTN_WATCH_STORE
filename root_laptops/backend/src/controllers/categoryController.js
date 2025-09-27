import Category from '../models/Category.js';

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).populate('parent_id');
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get single category
// @route   GET /api/v1/categories/:id
// @access  Public
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('parent_id');
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
  try {
    const { name, parent_id } = req.body;
    const newCategory = new Category({ name, parent_id });
    const savedCategory = await newCategory.save();
    res.status(201).json({ success: true, data: savedCategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res) => {
  try {
    const { name, parent_id } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, parent_id },
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
  try {
    // Optional: Check if any product is using this category before deletion
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
