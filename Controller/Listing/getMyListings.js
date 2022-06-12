const Listing = require("../../Model/Listing.model");
const Category = require("../../Model/Category.model");

// Controller for get all listings
const getMyListings = async (req, res) => {
  // Fetch all listings paginated

  try {
    // Fetch users listing list reversely
    const listingList = await Listing.findAndCountAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
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
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = getMyListings;
