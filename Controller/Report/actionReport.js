const Report = require("../../Model/Report.model");
const Listing = require("../../Model/Listing.model");
const Request = require("../../Model/Request.model");
const Image = require("../../Model/Image.model");
const Keyword = require("../../Model/Request.model");
const Requirement = require("../../Model/Requirement.model");

// get the report using the id
const actionReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    // get the Listing based on the report's listingId
    const listing = await Listing.findById(report.listingId, {
      include: [Image, Keyword, Requirement],
    });

    // get all the request based on the listingId
    const requests = await Request.findAll({
      where: { listingId: report.listingId },
      attributes: ["id"],
    });

    // delete all the requests
    for (let i = 0; i < requests.length; i++) {
      await requests[i].destroy();
    }

    // Delete listing images
    if (listing.preview_image) {
      const imagePath = path.join(
        __dirname,
        "../../uploads",
        listing.preview_image.substring(
          listing.preview_image.lastIndexOf("/") + 1
        )
      );
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    // Delete Image model images
    listing.images.map(async (item) => {
      let imagePath = path.join(
        __dirname,
        "../../uploads",
        item.image.substring(item.image.lastIndexOf("/") + 1)
      );
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
      await item.destroy();
    });

    // Delete Keyword model keywords
    await listing.keywords.map(async (item) => {
      await item.destroy();
    });

    // Delete Requirement model requirements
    await listing.requirements.map(async (item) => {
      await item.destroy();
    });

    // Delete Listing
    await listing.destroy();

    // delete the report
    await report.destroy();

    res.status(200).json({ message: "Action successfully" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = actionReport;
