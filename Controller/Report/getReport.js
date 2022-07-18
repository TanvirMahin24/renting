const Listing = require("../../Model/Listing.model");
const Report = require("../../Model/Report.model");
const User = require("../../Model/User.model");

// GET ALL Report OF AUTH MODERATOR
const getReport = async (req, res) => {
  try {
    const reports = await Report.findAll({
      order: [["listingId", "DESC"]],
      include: [
        {
          model: Listing,
          attributes: ["id", "title", "slug"],
        },
        {
          model: User,
          attributes: ["id", "first_name", "last_name"],
        },
      ],
    });
    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getReport;
