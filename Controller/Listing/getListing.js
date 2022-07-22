const Listing = require("../../Model/Listing.model");
const Category = require("../../Model/Category.model");

// Controller for get all listings
const getAllListings = async (req, res) => {
  // Fetch all listings paginated
  try {
    let { limit, page, category } = req.query;

    // Default query params
    if (!limit) {
      // Infinity limit
      limit = Number.MAX_SAFE_INTEGER;
    }
    if (!page) {
      page = 1;
    }
    if (!category) {
      category = "";
    }

    // Converting params to integer
    limit = parseInt(limit);
    page = parseInt(page);

    // Determining offset
    let offset = (page - 1) * limit;

    // Fetch paginated list reversely
    const listingList = await Listing.findAndCountAll({
      limit,
      offset,

      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],

      where: {
        approved: "approved",
      },

      order: [["id", "DESC"]],
    });

    // Send Error Response
    if (!listingList) {
      return res.status(404).json({
        message: "Listings not found",
      });
    }
    // Send Response
    return res.status(200).json({
      success: true,
      data: listingList,
    });
  } catch (error) {
    // Send Error
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = getAllListings;
