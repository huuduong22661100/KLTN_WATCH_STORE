import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true, trim: true },
  description: [{
    name: { type: String },
    title: { type: String },
  }],
  images: {
    mainImg: {
      url: { type: String, required: true },
      alt_text: { type: String }
    },
    sliderImg: [{
      url: { type: String, },
      alt_text: { type: String }
    }]
  },
  price: { type: Number, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  brand: { type: String },
  sku: { type: String },
  category_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: String }],
  gender: { type: String, enum: ['Nam', 'Nữ'] },
  origin: { type: String, default: "Nhật Bản" },
  color_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Color' },
  specifications: {
    weight: { type: String },
    movement: { type: String },
    size: { type: String },
    thickness: { type: String },
    band_variation: { type: String },
    glass_material: { type: String },
    water_resistance_level: { type: String },
    dial_shape: { type: String }
  },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
