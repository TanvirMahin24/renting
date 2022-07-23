const Reset = require("../../Model/Reset.model");
const User = require("../../Model/User.model");
const sendMail = require("../../Utils/sendMail");

// sent reset link to user
const ResetLinkSend = async (req, res) => {
  // email check if user exist
  const user = await User.findAll({ where: { email: req.body.email } });

  if (user.length > 0) {
    // generate reset link
    const resetLink = await Reset.create({
      userId: user[0].id,
      token:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
    });

    // send email with reset link
    const emailResult = await sendMail({
      to: user[0].email,
      subject: "Reset Password",
      template: "reset",
      context: {
        name: `${user[0].first_name} ${user[0].last_name}`,
        link: `http://localhost:3000/reset/${resetLink.token}`,
      },
    });

    return res.status(200).json({
      message: "Reset link sent to your email",
    });
  }
};

module.exports = ResetLinkSend;
