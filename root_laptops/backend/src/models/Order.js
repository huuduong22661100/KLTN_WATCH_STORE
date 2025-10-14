import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  order_number: {
    type: String,
    unique: true,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  shipping_fee: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipping', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shipping_name: {
    type: String,
    required: true
  },
  shipping_phone: {
    type: String,
    required: true
  },
  shipping_address: {
    type: String,
    required: true
  },
  shipping_district: {
    type: String,
    required: true
  },
  shipping_city: {
    type: String,
    required: true
  },
  payment_method: {
    type: String,
    required: true,
    enum: ['cod', 'bank_transfer', 'credit_card']
  },
  note: {
    type: String
  }
}, {
  timestamps: true
});

// Auto generate order_number
orderSchema.pre('save', async function(next) {
  if (!this.order_number) {
    const count = await mongoose.model('Order').countDocuments();
    this.order_number = `ORD${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

export default mongoose.model('Order', orderSchema);