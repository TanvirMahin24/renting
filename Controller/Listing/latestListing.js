const Listing = require("../../Model/Listing.model");
const Image = require("../../Model/Image.model");
const Requirement = require("../../Model/Requirement.model");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

// return the latest listing
const getLatestListing = async (req, res) => {
  try {
    const listing = await Listing.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        "listing.imgCount": { [Op.gt]: 3 },
        [Op.gte]: sequelize.fn("COUNT", sequelize.col("sensors.id")),
      },

      include: [
        {
          model: Image,
          attributes: [],
        },
        {
          model: Requirement,
        },
      ],

      attributes: [
        [sequelize.fn("COUNT", sequelize.col("listing.image.id")), "imgCount"],
      ],

      limit: 1,
    });
    return res.status(200).json({
      message: "Latest listing successfully",
      data: listing,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error getting latest listing",
      error: error.message,
    });
  }
};

module.exports = { getLatestListing };
