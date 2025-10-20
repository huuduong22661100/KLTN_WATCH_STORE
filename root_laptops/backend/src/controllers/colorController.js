import Color from '../models/Color.js';




export const getColors = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};

    if (search) {
      filter.color = { $regex: search, $options: 'i' }; 
    }

    const colors = await Color.find(filter).sort({ id: 1 });
    res.status(200).json({ success: true, data: colors });
  } catch (error) {
    console.error('Error in getColors:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};




export const getColorById = async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy màu sắc' });
    }
    res.status(200).json({ success: true, data: color });
  } catch (error) {
    console.error('Error in getColorById:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};




export const createColor = async (req, res) => {
  try {
    const { color, id } = req.body;
    
    
    const existingColor = await Color.findOne({ color });
    if (existingColor) {
      return res.status(400).json({ success: false, message: 'Màu sắc đã tồn tại' });
    }

    const newColor = new Color({ color, id });
    const savedColor = await newColor.save();
    res.status(201).json({ success: true, data: savedColor });
  } catch (error) {
    console.error('Error in createColor:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};




export const updateColor = async (req, res) => {
  try {
    const { color } = req.body;
    const updatedColor = await Color.findByIdAndUpdate(
      req.params.id,
      { color },
      { new: true, runValidators: true }
    );
    if (!updatedColor) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy màu sắc' });
    }
    res.status(200).json({ success: true, data: updatedColor });
  } catch (error) {
    console.error('Error in updateColor:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};




export const deleteColor = async (req, res) => {
  try {
    const color = await Color.findByIdAndDelete(req.params.id);
    if (!color) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy màu sắc' });
    }
    res.status(200).json({ success: true, message: 'Xóa màu sắc thành công' });
  } catch (error) {
    console.error('Error in deleteColor:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
