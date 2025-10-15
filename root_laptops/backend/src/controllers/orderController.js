import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

// Tạo đơn hàng từ giỏ hàng
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

    // Validate input
    if (!shipping_name || !shipping_phone || !shipping_address || !shipping_city || !shipping_district || !payment_method) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin giao hàng.'
      });
    }

    // Lấy giỏ hàng của user
    const cart = await Cart.findOne({ user_id: userId }).populate('items');
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Giỏ hàng trống.'
      });
    }

    // Lấy chi tiết các items trong cart
    const cartItems = await CartItem.find({ cart_id: cart._id }).populate('product_id');
    
    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Giỏ hàng trống.'
      });
    }

    // Tính tổng tiền
    let total = 0;
    const orderItems = [];
    
    for (const item of cartItems) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Sản phẩm ${item.product_id} không tồn tại.`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Sản phẩm "${product.title}" không đủ số lượng trong kho.`
        });
      }

      const subtotal = product.price * item.quantity;
      total += subtotal;

      orderItems.push({
        product_id: product._id,
        product_name: product.title,
        product_image: product.images?.mainImg?.url || '',
        quantity: item.quantity,
        price: product.price,
        subtotal: subtotal
      });
    }

    // Tạo đơn hàng - SỬ DỤNG 'total' THAY VÌ 'total_amount'
    const order = new Order({
      user_id: userId,
      total: total, // ✅ FIXED: Dùng 'total' khớp với model
      shipping_fee: 0, // Có thể tính phí ship sau
      shipping_name,
      shipping_phone,
      shipping_address,
      shipping_district,
      shipping_city,
      payment_method,
      note: note || '',
      status: 'pending',
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
        item.product_id,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Xóa giỏ hàng sau khi đặt hàng thành công
    await CartItem.deleteMany({ cart_id: cart._id });

    // Lấy order đầy đủ với items
    const fetchedOrderItems = await OrderItem.find({ order_id: order._id });

    res.status(201).json({
      success: true,
      message: 'Đặt hàng thành công',
      data: {
        order: {
          ...order.toObject(),
          items: fetchedOrderItems
        }
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

    const orders = await Order.find({ user_id: req.user.id })
      .populate('user_id', 'name email phone')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments({ user_id: req.user.id });

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

// Lấy chi tiết một đơn hàng
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

    // Kiểm tra người dùng có quyền xem đơn hàng này không
    if (order.user_id._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Không có quyền truy cập'
      });
    }

    // Lấy các sản phẩm trong đơn hàng
    const orderItems = await OrderItem.find({ order_id: id })
      .populate('product_id', 'name price images');

    res.json({
      success: true,
      data: {
        ...order.toObject(),
        items: orderItems
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

// Cập nhật trạng thái đơn hàng (chỉ admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Trạng thái không hợp lệ'
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng'
      });
    }

    res.json({
      success: true,
      message: 'Cập nhật trạng thái đơn hàng thành công',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật trạng thái đơn hàng',
      error: error.message
    });
  }
};

// Lấy tất cả đơn hàng (chỉ admin)
export const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, customerName, date, orderCode, paymentMethod } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (paymentMethod) filter.payment_method = paymentMethod;

    // Filter by customer name
    if (customerName) {
      const users = await User.find({ name: { $regex: customerName, $options: 'i' } }).select('_id');
      const userIds = users.map(user => user._id);
      filter.user_id = { $in: userIds };
    }

    // Filter by order code (order_number or _id)
    if (orderCode) {
      filter.$or = [
        { order_number: { $regex: orderCode, $options: 'i' } },
        { _id: orderCode } // Allow searching by MongoDB _id directly
      ];
    }

    // Filter by date (createdAt)
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
