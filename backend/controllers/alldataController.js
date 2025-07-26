import User from "../models/userModels.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModels.js";

export const getAdminStatus = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    const allOrders = await Order.find();
    const totalRevenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    res.status(200).json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue,
    });
  } catch (error) {
    console.error("Status error:", error.message);
    res.status(500).json({ error: "Failed to fetch status" });
  }
};
