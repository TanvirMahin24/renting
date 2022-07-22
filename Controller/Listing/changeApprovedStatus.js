const Listing = require("../../Model/Listing.model");

const changeApprovedStatus = async (req, res) => {
  try {
    // find listing by id
    const listing = await Listing.findByPk(req.params.id);

    // check if listing exist
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const { status } = req.body;

    const updatedListing = await listing.update({ approved: status });

    return res
      .status(200)
      .json({ message: "Listing updated successfully", data: updatedListing });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = changeApprovedStatus;
