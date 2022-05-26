const User = require("../../Model/User.model");
const getAuthUser = async (req, res) => {
  // Fetch all subscribers
  try {
    const authUser = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password", "salt"] },
    });
    console.log(req);

    // Send Response
    res.status(200).json({
      success: true,
      data: authUser,
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

module.exports = { getAuthUser, getAllUser };
