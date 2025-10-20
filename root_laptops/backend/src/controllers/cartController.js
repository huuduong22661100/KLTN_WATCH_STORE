import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';


export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user_id: req.user.id });
    
    if (!cart) {
      cart = new Cart({ user_id: req.user.id });
      await cart.save();
    }

    const cartItems = await CartItem.find({ cart_id: cart._id })
      .populate('watch_id')


    const totalAmount = cartItems.reduce((total, item) => {
      
      const itemPrice = item.watch_id.sale_price || parseFloat(item.price);
      return total + (itemPrice * item.quantity);
    }, 0);

    res.json({
      success: true,
      data: {
        cart_id: cart._id,
        items: cartItems,
        total_amount: totalAmount,
        item_count: cartItems.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi lấy giỏ hàng',
      error: error.message
    });
  }
};


export const addToCart = async (req, res) => {
  try {
    const { watch_id, quantity = 1 } = req.body;

    
    const product = await Product.findById(watch_id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    
    let cart = await Cart.findOne({ user_id: req.user.id });
    
    if (!cart) {
      cart = new Cart({ user_id: req.user.id });
      await cart.save();
    }

    
    const existingItem = await CartItem.findOne({
      cart_id: cart._id,
      watch_id: watch_id
    });
    
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      
      const cartItem = new CartItem({
        cart_id: cart._id,
        watch_id: watch_id,
        quantity: quantity,
        price: product.sale_price || product.price
      });
      await cartItem.save();
    }

    res.json({
      success: true,
      message: 'Thêm sản phẩm vào giỏ hàng thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi thêm sản phẩm vào giỏ hàng',
      error: error.message
    });
  }
};


export const updateCartItem = async (req, res) => {
  try {
    const { item_id } = req.params;
    const { quantity } = req.body;
    
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Số lượng phải lớn hơn 0'
      });
    }

    const cartItem = await CartItem.findByIdAndUpdate(
      item_id,
      { quantity },
      { new: true }
    ).populate('watch_id', 'name price');

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy giỏi hàng '
      });
    }

    res.json({
      success: true,
      message: 'Cập nhập số lượng sản phẩm thành công',
      data: cartItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhập số lượng sản phẩm',
      error: error.message
    });
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const { item_id } = req.params;

    const cartItem = await CartItem.findByIdAndDelete(item_id);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
      });
    }

    res.json({
      success: true,
      message: 'Sóa sản phẩm thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa sản phẩm',
      error: error.message
    });
  }
};



export const clearUserCart = async (req, res) => {
  try {
    const userId = req.user.id;

    
    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy giỏ hàng của người dùng.'
      });
    }

    
    await CartItem.deleteMany({ cart_id: cart._id });

    res.json({
      success: true,
      message: 'Giỏ hàng đã được xóa thành công.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa giỏ hàng',
      error: error.message
    });
  }
};


export const updateUserCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body; 

    
    let cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      cart = new Cart({ user_id: userId });
      await cart.save();
    }

    
    await CartItem.deleteMany({ cart_id: cart._id });

    
    const newCartItems = [];
    for (const item of items) {
      const product = await Product.findById(item.watch_id);
      if (!product) {
        
        console.warn(`Product with ID ${item.watch_id} not found. Skipping.`);
        continue;
      }
      newCartItems.push({
        cart_id: cart._id,
        watch_id: item.watch_id,
        quantity: item.quantity,
        price: product.sale_price || product.price 
      });
    }

    if (newCartItems.length > 0) {
      await CartItem.insertMany(newCartItems);
    }

    res.json({
      success: true,
      message: 'Giỏ hàng đã được cập nhật thành công.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật giỏ hàng',
      error: error.message
    });
  }
};