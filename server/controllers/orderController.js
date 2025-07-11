// server/controllers/orderController.js
import Order from "../models/Order.js";
import Product from "../models/Product.js";

//place order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.json({
        success: false,
        message: "Please provide address and items",
      });
    }

    //calculate amount using items
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      amount += product.offerPrice * item.quantity;
    }

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });
    res.json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//place order Online : /api/order/online
export const placeOrderOnline = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const {origin} = req.headers;


    if (!address || items.length === 0) {
      return res.json({
        success: false,
        message: "Please provide address and items",
      });
    }

    let productData = [];

    //calculate amount using items
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });

      amount += product.offerPrice * item.quantity;
    }

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.float(item.price * 100)
        },
        quantity: item.quantity,
      }
    });

    


    res.json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//get orders by user id : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get all orders (for seller / admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
