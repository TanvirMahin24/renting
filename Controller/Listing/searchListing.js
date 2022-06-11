const { Op } = require("sequelize");
const Keyword = require("../../Model/Keyword.model");
const Listing = require("../../Model/Listing.model");

const searchListing = async (req, res) => {
  // Get search text from request
  const { search } = req.query;

  try {
    // Find listing with search text sequalize query
    const keywords = await Keyword.findAll({
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
      },
    });

    // Get keyword ids
    const keywordIds = keywords.map((keyword) => keyword.id);

    // Find listings with keyword ids and other search text paginated
    const listings = await Listing.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          { "$keywords.id$": { [Op.in]: keywordIds } },
        ],
      },

      include: [
        {
          model: Keyword,
        },
      ],
    });

    // Send response
    res.status(200).json({
      message: "Listings found",
      data: listings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = searchListing;
