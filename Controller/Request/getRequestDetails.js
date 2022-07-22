const Request = require("../../Model/Request.model");
const User = require("../../Model/User.model");
const Listing = require("../../Model/Listing.model");
const Category = require("../../Model/Category.model");

// Get request details by pk
const getRequestDetails = async (req, res) => {
  try {
    // get id param
    const id = req.params.id;

    // get request details by id
    const request = await Request.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "first_name", "last_name", "email", "phone"],
        },
        {
          model: Listing,
          include: [Category],
        },
      ],
    });

    // not found response
    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    let owner = null;
    if (request.status === "approved") {
      // Fetch owner
      owner = await User.findByPk(request.listing.userId, {
        attributes: ["id", "first_name", "last_name", "email", "phone"],
      });
    }
    // success response
    return res.status(200).json({
      message: "Request details",
      data: {
        ...request.get({ plain: true }),
        owner,
      },
    });
  } catch (error) {
    // error response
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = getRequestDetails;
