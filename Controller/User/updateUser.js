const User = require("../../Model/User.model");
const { validPassword, genPassword } = require("../../Utils/hashPassword");

const updateProfile = async (req, res) => {
  // get id from request
  const id = parseInt(req.params.id);

  // check id is auth user id
  if (id !== req.user.id) {
    return res.status(401).json({
      message: "You are not authorized to update this user",
    });
  }

  // get data from request
  const { first_name, last_name, email, phone } = req.body;
  try {
    // find user by id
    const user = await User.findByPk(id, { except: ["password", "salt"] });

    // if user not found
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      // update user profile
      await user.update({
        first_name,
        last_name,
        email,
        phone,
      });

      // send response
      return res.status(200).json({
        message: "User updated successfully",
        data: user,
      });
    }
  } catch (error) {
    // send error
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updatePassword = async (req, res) => {
  // get id from authenticated user
  const id = req.user.id;
  console.log(req.user);

  // get data from request
  const { password, newPassword } = req.body;

  try {
    // find user by id
    const user = await User.findByPk(id);

    // if user not found
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      // check password is correct
      if (validPassword(password, user.password, user.salt)) {
        const pass = genPassword(newPassword);
        // update user password
        await user.update({
          password: pass.hash,
          salt: pass.salt,
        });

        // send response
        return res.status(200).json({
          message: "Password updated successfully",
        });
      } else {
        // password incorrect
        return res.status(401).json({
          message: "Password incorrect",
        });
      }
    }
  } catch (error) {
    // send error
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { updateProfile, updatePassword };
