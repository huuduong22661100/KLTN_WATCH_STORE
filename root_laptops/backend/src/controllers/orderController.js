import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';


export const createOrder = async (req, res) => {
  try {
    const {
      shipping_name,
      shipping_phone,
      shipping_address,
      shipping_city,
      shipping_district,
      shipping_ward,
      payment_method,
      note
    } = req.body;
    const userId = req.user.id;

    
    if (!shipping_name || !shipping_phone || !shipping_address || !shipping_city || !shipping_district || !payment_method) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin giao hàng.'
      });
    }

    
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      return res.status(400).json({
        success: false,
        message: 'Giỏ hàng trống.'
      });
    }

    
    const cartItems = await CartItem.find({ cart_id: cart._id }).populate('watch_id');
    
    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Giỏ hàng trống.'
      });
    }

    
    let subtotal = 0;
    const orderItems = [];
    
    for (const item of cartItems) {
      const product = item.watch_id; 
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Sản phẩm không tồn tại.`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Sản phẩm "${product.title}" không đủ số lượng trong kho.`
        });
      }

      
      const actualPrice = product.sale_price 
        ? parseFloat(product.sale_price.toString()) 
        : parseFloat(product.price.toString());
      const itemSubtotal = actualPrice * item.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        product_id: product._id,
        product_name: product.title,
        product_image: product.images?.mainImg?.url || '',
        quantity: item.quantity,
        price: actualPrice,
        subtotal: itemSubtotal
      });
    }

    // Tính discount và total
    const discount = 0; // TODO: Implement discount logic nếu có voucher/coupon
    const shipping_fee = 0; // TODO: Implement shipping fee logic
    const total = subtotal - discount + shipping_fee;

    // Tạo order_number tự động
    const orderCount = await Order.countDocuments();
    const orderNumber = `ORD${String(orderCount + 1).padStart(6, '0')}`;

    // Xác định payment_status dựa vào payment_method
    const paymentStatus = payment_method === 'cod' ? 'unpaid' : 'paid';

    // Tạo đơn hàng với 3 trạng thái
    const order = new Order({
      order_number: orderNumber,
      user_id: userId,
      subtotal: subtotal,
      discount: discount,
      shipping_fee: shipping_fee,
      total: total,
      shipping_name,
      shipping_phone,
      shipping_address,
      shipping_district,
      shipping_city,
      payment_method,
      note: note || '',
      // ✅ 3 trạng thái mới
      payment_status: paymentStatus,
      order_status: 'pending',
      shipping_status: 'not_shipped',
      // Giữ status cũ cho tương thích
      status: 'pending',
      // ✅ Khởi tạo lịch sử
      status_history: [{
        status_type: 'order_status',
        old_value: null,
        new_value: 'pending',
        changed_by: userId,
        note: 'Đơn hàng được tạo'
      }]
    });

    await order.save();

    // Tạo order items
    const itemsToCreate = orderItems.map(item => ({
      ...item,
      order_id: order._id
    }));

    await OrderItem.insertMany(itemsToCreate);

    // Cập nhật số lượng sản phẩm trong kho
    for (const item of cartItems) {
      await Product.findByIdAndUpdate(
        item.watch_id._id,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Xóa giỏ hàng sau khi đặt hàng thành công
    await CartItem.deleteMany({ cart_id: cart._id });

    // Lấy order đầy đủ với items
    const fetchedOrderItems = await OrderItem.find({ order_id: order._id });

    const orderResponse = {
      ...order.toObject(),
      items: fetchedOrderItems
    };

    console.log('✅ Order created:', orderResponse);

    res.status(201).json({
      success: true,
      message: 'Đặt hàng thành công',
      data: {
        order: orderResponse
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo đơn hàng',
      error: error.message,
    });
  }
};

// Lấy đơn hàng của người dùng
export const getUserOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    console.log('📦 Getting orders for user:', req.user.id);

    const orders = await Order.find({ user_id: req.user.id })
      .populate('user_id', 'name email phone')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments({ user_id: req.user.id });

    console.log(`✅ Found ${orders.length} orders for user`);

    res.json({
      success: true,
      data: {
        orders: orders,
        total: total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách đơn hàng',
      error: error.message
    });
  }
};


export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate('user_id', 'name email phone address');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng'
      });
    }

    
    if (order.user_id._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Không có quyền truy cập'
      });
    }

    
    const orderItems = await OrderItem.find({ order_id: id })
      .populate('product_id', 'name price images');

    res.json({
      success: true,
      data: {
        order: {
          ...order.toObject(),
          items: orderItems
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin đơn hàng',
      error: error.message
    });
  }
};


export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { payment_status, note } = req.body;

    const validStatuses = ['unpaid', 'paid', 'refunded'];
    if (!validStatuses.includes(payment_status)) {
      return res.status(400).json({
        success: false,
        message: 'Trạng thái thanh toán không hợp lệ'
      });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng'
      });
    }

    const oldStatus = order.payment_status;
    order.payment_status = payment_status;
    
    
    order.status_history.push({
      status_type: 'payment_status',
      old_value: oldStatus,
      new_value: payment_status,
      changed_by: req.user.id,
      note: note || `Cập nhật trạng thái thanh toán: ${oldStatus} → ${payment_status}`
    });

    await order.save();

    res.json({
      success: true,
      message: 'Cập nhật trạng thái thanh toán thành công',
      data: { order }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật trạng thái thanh toán',
      error: error.message
    });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_status, note } = req.body;

    const validStatuses = ['pending', 'confirmed', 'processing', 'ready_to_ship', 'completed', 'cancelled'];
    if (!validStatuses.includes(order_status)) {
      return res.status(400).json({
        success: false,
        message: 'Trạng thái đơn hàng không hợp lệ'
      });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng'
      });
    }

    const oldStatus = order.order_status;
    order.order_status = order_status;
    
    
    order.status = order_status === 'ready_to_ship' ? 'confirmed' : order_status;
    
    
    order.status_history.push({
      status_type: 'order_status',
      old_value: oldStatus,
      new_value: order_status,
      changed_by: req.user.id,
      note: note || `Admin cập nhật: ${oldStatus} → ${order_status}`
    });

    await order.save();

    res.json({
      success: true,
      message: 'Cập nhật trạng thái đơn hàng thành công',
      data: { order }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật trạng thái đơn hàng',
      error: error.message
    });
  }
};


export const updateShippingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { shipping_status, shipping_info, note } = req.body;

    const validStatuses = ['not_shipped', 'picking', 'in_transit', 'out_for_delivery', 'delivered', 'failed_delivery', 'returning', 'returned'];
    if (!validStatuses.includes(shipping_status)) {
      return res.status(400).json({
        success: false,
        message: 'Trạng thái giao hàng không hợp lệ'
      });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng'
      });
    }

    const oldStatus = order.shipping_status;
    order.shipping_status = shipping_status;
    
    
    if (shipping_info) {
      order.shipping_info = { ...order.shipping_info, ...shipping_info };
    }

    
    if (shipping_status === 'delivered') {
      order.shipping_info.actual_delivery = new Date();
      order.order_status = 'completed';
      
      if (order.payment_method === 'cod') {
        order.payment_status = 'paid';
      }
    }
    
    
    order.status_history.push({
      status_type: 'shipping_status',
      old_value: oldStatus,
      new_value: shipping_status,
      changed_by: req.user.id,
      note: note || `Cập nhật giao hàng: ${oldStatus} → ${shipping_status}`
    });

    await order.save();

    res.json({
      success: true,
      message: 'Cập nhật trạng thái giao hàng thành công',
      data: { order }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật trạng thái giao hàng',
      error: error.message
    });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      paymentStatus, 
      orderStatus, 
      shippingStatus, 
      customerName, 
      date, 
      orderCode, 
      paymentMethod 
    } = req.query;

    const filter = {};

    
    if (paymentStatus) filter.payment_status = paymentStatus;
    
    
    if (orderStatus) filter.order_status = orderStatus;
    
    
    if (shippingStatus) filter.shipping_status = shippingStatus;
    
    
    if (paymentMethod) filter.payment_method = paymentMethod;

    
    if (customerName) {
      const users = await User.find({ name: { $regex: customerName, $options: 'i' } }).select('_id');
      const userIds = users.map(user => user._id);
      filter.user_id = { $in: userIds };
    }

    
    if (orderCode) {
      filter.$or = [
        { order_number: { $regex: orderCode, $options: 'i' } },
        { _id: orderCode } 
      ];
    }

    
    if (date) {
      const searchDate = new Date(date);
      searchDate.setHours(0, 0, 0, 0);
      const nextDay = new Date(searchDate);
      nextDay.setDate(searchDate.getDate() + 1);

      filter.createdAt = {
        $gte: searchDate,
        $lt: nextDay,
      };
    }

    const orders = await Order.find(filter)
      .populate('user_id', 'name email phone')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      data: orders,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách đơn hàng',
      error: error.message
    });
  }
};


export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng'
      });
    }

    
    if (order.user_id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Không có quyền hủy đơn hàng này'
      });
    }

    
    if (!['pending', 'confirmed'].includes(order.order_status)) {
      return res.status(400).json({
        success: false,
        message: 'Không thể hủy đơn hàng ở trạng thái hiện tại'
      });
    }

    const oldOrderStatus = order.order_status;
    order.order_status = 'cancelled';
    order.status = 'cancelled'; 

    
    if (order.payment_status === 'paid' && order.payment_method !== 'cod') {
      order.payment_status = 'refunded';
    }

    
    order.status_history.push({
      status_type: 'order_status',
      old_value: oldOrderStatus,
      new_value: 'cancelled',
      changed_by: req.user.id,
      note: reason || `Đơn hàng bị hủy bởi ${req.user.role === 'admin' ? 'Admin' : 'Khách hàng'}`
    });

    
    const orderItems = await OrderItem.find({ order_id: id });
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(
        item.product_id,
        { $inc: { stock: item.quantity } }
      );
    }

    await order.save();

    res.json({
      success: true,
      message: 'Hủy đơn hàng thành công',
      data: { order }
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi hủy đơn hàng',
      error: error.message
    });
  }
};
