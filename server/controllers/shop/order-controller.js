const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");


const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus = "pending", // Default order status
      paymentMethod = "none",  // No payment method needed
      paymentStatus = "unpaid", // Default to unpaid
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    // Create the order without any payment processing
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
    });

    await newlyCreatedOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: newlyCreatedOrder._id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.body; // No paymentId or payerId since no payment is processed

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order cannot be found",
      });
    }

    // Update order status to confirmed and payment status to paid (since no payment is processed)
    order.paymentStatus = "paid"; // Mark the payment as completed
    order.orderStatus = "confirmed"; // Confirm the order

    // Deduct stock for the ordered items
    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found for ${item.title}`,
        });
      }

      // Reduce stock based on the quantity ordered
      product.totalStock -= item.quantity;

      await product.save();
    }

    // Remove the associated cart after order completion
    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};


module.exports = {
  getAllOrdersByUser,
  getOrderDetails,
  createOrder,
  confirmOrder,
};