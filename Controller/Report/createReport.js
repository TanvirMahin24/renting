const Report = require("../../Model/Report.model");
const Listing = require("../../Model/Listing.model");
const { validationResult } = require("express-validator");

// Create a Report
const createReport = async (req, res) => {
  const { message } = req.body;
  const { id } = req.params;

  // validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    // check Listing exists or not
    const listing = await Listing.findByPk(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // check user already has a report on this listing
    const report = await Report.findOne({
      where: {
        listingId: listing.id,
        userId: req.user.id,
      },
    });

    if (report) {
      return res
        .status(400)
        .json({ message: "You have already reported this listing" });
    }

    // create report
    const newReport = await Report.create({
      message,
      listingId: id,
      userId: req.user.id,
    });

    // send response
    return res.status(200).json({
      success: true,
      data: newReport,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createReport;
