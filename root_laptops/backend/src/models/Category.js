import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: { type: Number, required: true, trim: true },
  category: { type: String, required: true, trim: true }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
