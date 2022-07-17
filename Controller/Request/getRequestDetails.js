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

    // Fetch moderator
    const moderator = await User.findByPk(request.moderator_id, {
      attributes: ["id", "first_name", "last_name", "email", "phone"],
    });
    console.log(moderator);
    // success response
    return res.status(200).json({
      message: "Request details",
      data: {
        ...request.get({ plain: true }),
        moderator,
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
