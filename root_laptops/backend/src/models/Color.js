import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    trim: true
  },
  color: {
    type: String,
    required: true,
    trim: true
  },

}, {
  timestamps: true
});

export default mongoose.model('Color', colorSchema);
