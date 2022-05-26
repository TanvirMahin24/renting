const { genPassword } = require("../../Utils/hashPassword");
const { validationResult } = require("express-validator");
const User = require("../../Model/User.model");
const sendMail = require("../../Utils/sendMail");

const registerController = async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  // Form data
  const { username, password, email, phone, role } = req.body;

  // Check User exist or not
  const newUser = await User.findAll({ where: { email: email } });
  if (newUser.length > 0) {
    return res.status(400).json({
      message: "User already exist",
    });
  } else {
    // Create new user
    const passHash = genPassword(password);
    const newUser = await User.create({
      username,
      email,
      phone,
      password: passHash.hash,
      salt: passHash.salt,
      role: role ? role : "user",
    });

    // Send Email
    // const emailResult = await sendMail({
    //   to: newUser.email,
    //   subject: "Thanks For Joining Us",
    //   template: "register",
    // });

    return res.status(200).json({
      message: "User created successfully",
      data: { ...newUser.dataValues, password: null, salt: null },
    });
  }
};

module.exports = { registerController };
