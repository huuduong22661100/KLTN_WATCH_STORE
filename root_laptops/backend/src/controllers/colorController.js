import Color from '../models/Color.js';

// @desc    Get all colors
// @route   GET /api/v1/colors
// @access  Public
export const getColors = async (req, res) => {
  try {
    const colors = await Color.find({});
    res.status(200).json({ success: true, data: colors });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get single color
// @route   GET /api/v1/colors/:id
// @access  Public
export const getColorById = async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) {
      return res.status(404).json({ success: false, message: 'Color not found' });
    }
    res.status(200).json({ success: true, data: color });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Create a color
// @route   POST /api/v1/colors
// @access  Private/Admin
export const createColor = async (req, res) => {
  try {
    const { name, hex, slug } = req.body;
    const newColor = new Color({ name, hex, slug });
    const savedColor = await newColor.save();
    res.status(201).json({ success: true, data: savedColor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a color
// @route   PUT /api/v1/colors/:id
// @access  Private/Admin
export const updateColor = async (req, res) => {
  try {
    const { name, hex, slug } = req.body;
    const updatedColor = await Color.findByIdAndUpdate(
      req.params.id,
      { name, hex, slug },
      { new: true, runValidators: true }
    );
    if (!updatedColor) {
      return res.status(404).json({ success: false, message: 'Color not found' });
    }
    res.status(200).json({ success: true, data: updatedColor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a color
// @route   DELETE /api/v1/colors/:id
// @access  Private/Admin
export const deleteColor = async (req, res) => {
  try {
    const color = await Color.findByIdAndDelete(req.params.id);
    if (!color) {
      return res.status(404).json({ success: false, message: 'Color not found' });
    }
    res.status(200).json({ success: true, message: 'Color deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
