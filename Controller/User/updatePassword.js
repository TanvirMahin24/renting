const Reset = require("../../Model/Reset.model");
const User = require("../../Model/User.model");
const { genPassword } = require("../../Utils/hashPassword");

// password change controller
const resetPassword = async (req, res) => {
  try {
    // get token from params
    const token = req.params.token;

    // no password
    if (!req.body.password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    // get userId from token
    const reset = await Reset.findAll({
      where: {
        token: token,
      },
    });

    // if userId is not found
    if (!reset) {
      return res.status(404).json({
        message: "Invalid token",
      });
    }

    // get userId from token
    const userId = reset[0].userId;

    // get user from userId
    const user = await User.findByPk(userId);

    // if user is not found
    if (!user) {
      return res.status(404).json({
        message: "Invalid token",
      });
    }

    // update user password
    const passHash = genPassword(req.body.password);
    await user.update({
      password: passHash.hash,
      salt: passHash.salt,
    });

    // delete reset token
    await Reset.destroy({
      where: {
        token: token,
      },
    });

    // send response
    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = resetPassword;
