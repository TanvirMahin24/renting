const Request = require("../../Model/Request.model");

// GET ALL REQUESTS OF AUTH MODERATOR
const getMyReq = async (req, res) => {
  try {
    const requests = await Request.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getMyReq;
