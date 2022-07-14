const Request = require("../../Model/Request.model");

// GET ALL REQUESTS OF AUTH MODERATOR
const getRecentReq = async (req, res) => {
  try {
    const requests = await Request.findAndCountAll({
      where: {
        userId: req.user.id,
      },
      order: [["id", "DESC"]],
      limit: 5,
    });
    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getRecentReq;
