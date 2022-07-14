const Request = require("../../Model/Request.model");
const User = require("../../Model/User.model");
const Listing = require("../../Model/Listing.model");

// Get request details by pk
const changeStatus = async (req, res) => {
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
        Listing,
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

    // change status
    const requestUpdate = await request.update({
      status: req.body.status,
    });
    // success response
    return res.status(200).json({
      message: "Request updated",
      data: {
        ...requestUpdate.get({ plain: true }),
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

module.exports = changeStatus;
