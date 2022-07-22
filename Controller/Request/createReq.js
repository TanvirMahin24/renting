const Listing = require("../../Model/Listing.model");
const Request = require("../../Model/Request.model");
const { validationResult } = require("express-validator");

// Create a Request
const createReq = async (req, res) => {
  try {
    const { phone, name, occupation, job_title } = req.body;
    const { packId } = req.params;

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    // check if request exist or not
    const requestTemp = await Request.findAll({
      where: {
        listingId: packId,
        userId: req.user.id,
      },
    });

    if (requestTemp.length > 0) {
      return res
        .status(400)
        .json({ message: "You have already made a request to this listing" });
    }

    // Check Files exist or not
    const document = req.file ? req.file : null;

    // Fidn the Listing
    const pack = await Listing.findByPk(packId);
    if (!pack) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    // Create Request
    const request = await Request.create({
      phone,
      name,
      occupation,
      job_title,
      listingId: pack.id,
      userId: req.user.id,
      document:
        document !== null
          ? `${process.env.SERVER_DOMAIN}/api/uploads/${document.filename}`
          : null,
    });

    // Send Response
    return res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = createReq;
