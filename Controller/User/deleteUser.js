const User = require("../../Model/User.model");

const deleteUser = async (req, res) => {
  // get id from request
  const userId = req.params.id;
  try {
    // find user by id
    const user = await User.findByPk(userId);

    // if user not found
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // delete user
    await user.destroy();

    // send response
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    // send error
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { deleteUser };
