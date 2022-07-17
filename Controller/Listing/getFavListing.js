const { Op } = require("sequelize");
const Listing = require("../../Model/Listing.model");

// Controller for get all listings
const getFavListing = async (req, res) => {
  // Fetch all listings paginated
  try {
    let { id } = req.query;

    const ids = id.split(",");

    const packList = await Listing.findAll({
      where: {
        id: { [Op.in]: ids },
      },
      order: [["id", "DESC"]],
    });

    // Send Error Response
    if (!packList) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }
    // Send Response
    return res.status(200).json({
      success: true,
      data: packList,
    });
  } catch (error) {
    // Send Error
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = getFavListing;
