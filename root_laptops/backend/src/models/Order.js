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
  subtotal: {
    type: Number,
    default: 0,
    min: 0
  },
  shipping_fee: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  
  payment_status: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid'
  },
  
  order_status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'ready_to_ship', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  shipping_status: {
    type: String,
    enum: ['not_shipped', 'picking', 'in_transit', 'out_for_delivery', 'delivered', 'failed_delivery', 'returning', 'returned'],
    default: 'not_shipped'
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
  },
  
  status_history: [{
    status_type: {
      type: String,
      enum: ['payment_status', 'order_status', 'shipping_status']
    },
    old_value: String,
    new_value: String,
    changed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    changed_at: {
      type: Date,
      default: Date.now
    },
    note: String
  }],
  
  shipping_info: {
    shipper_name: String,
    shipper_phone: String,
    tracking_number: String,
    estimated_delivery: Date,
    actual_delivery: Date
  }
}, {
  timestamps: true
});


orderSchema.pre('save', async function(next) {
  if (!this.order_number) {
    const count = await mongoose.model('Order').countDocuments();
    this.order_number = `ORD${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

export default mongoose.model('Order', orderSchema);