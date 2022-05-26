const Order = require("../../Model/Order.model");

const getAllOrders = async (req, res) => {
  // Fetch all orders
  try {
    const allOrder = await Order.findAll();

    // Send Response
    res.status(200).json({
      success: true,
      data: allOrder,
    });
  } catch (error) {
    // Send Error
    res.status(401).json({
      message: "Not Authenticated",
    });
  }
};

const getAllUser = async (req, res) => {
  // Fetch all users
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password", "salt"] },
    });

    // Send response
    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    // Send Error
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { getAllOrders, getAllUser };
