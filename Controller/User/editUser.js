const User = require("../../Model/User.model");

const changeUserRole = async (req, res) => {
  // get id and role from request
  const userId = req.params.id;
  const { role } = req.body;
  try {
    // find user by id
    const user = await User.findByPk(userId);

    // if user not found
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // update user role
    await user.update({
      role,
    });

    // send response
    return res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    // send error
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  changeUserRole,
};
