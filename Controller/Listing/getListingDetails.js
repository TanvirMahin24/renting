const Listing = require("../../Model/Listing.model");
const Image = require("../../Model/Image.model");
const Keyword = require("../../Model/Keyword.model");
const Requirement = require("../../Model/Requirement.model");
const Category = require("../../Model/Category.model");

// Get Listing Details using slug
const getListingDetails = async (req, res) => {
  try {
    // Get slug from param
    const slug = req.params.slug;

    // Fetch Listing
    const listing = await Listing.findOne({
      where: {
        slug,
      },
      include: [
        {
          model: Image,
          as: "images",
          attributes: ["id", "image"],
        },
        {
          model: Keyword,
          as: "keywords",
          attributes: ["id", "name"],
        },
        {
          model: Requirement,
          as: "requirements",
          attributes: ["id", "name"],
        },
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    // Send Response
    return res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    // Send Error
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = getListingDetails;
