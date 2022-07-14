const Request = require("../../Model/Request.model");
const Listing = require("../../Model/Listing.model");
const { Op } = require("sequelize");

// GET ALL REQUESTS OF AUTH MODERATOR
const getAllReqMod = async (req, res) => {
  try {
    const status = req.params.status;
    const ids = [];

    // listing ids of auth user
    const listings = await Listing.findAll({
      where: {
        userId: req.user.id,
      },
      attributes: ["id"],
    });

    listings.forEach((listing) => {
      ids.push(listing.id);
    });

    const requests = await Request.findAll({
      where: {
        status: status,
        listingId: {
          [Op.in]: ids,
        },
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

module.exports = getAllReqMod;
