const Listing = require("../../Model/Listing.model");

// edit listing
// Language: javascript

const editListing = async (req, res) => {
  // find listing by id
  const listing = await Listing.findByPk(req.params.id);

  // check if listing exist
  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  // check if user is owner of listing
  if (listing.userId !== req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  // Form data
  const {
    title,
    category,
    keywords,
    requirements,
    description,
    size,
    price,
    sublet,
    //Rooms
    bedrooms,
    bathrooms,
    dining,
    kitchen,
    drawingroom,

    //Address
    full_address,
    district,
    house_no,
    floor_no,
    flat_no,
  } = req.body;

  // Check Files exist or not
  const files = req.files.image;
  const preview_image = req.files.preview_image;

  // Check Keywords exist or not
  if (!keywords) {
    return res.status(400).json({ message: "Keywords are required" });
  }

  // Create slug from title
  const slug = title.toLowerCase().replace(/ /g, "-");

  // Check slug exist or not
  try {
    const newListing = await Listing.findAll({ where: { slug: slug } });
    if (newListing.length > 0) {
      return res.status(400).json({
        message: "This title is already used",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }

  // update the listing
  try {
    const updatedListing = await listing.update({
      title,
      category,
      keywords,
      requirements,
      description,
      size,
      price,
      sublet,
      //Rooms
      bedrooms,
      bathrooms,
      dining,
      kitchen,
      drawingroom,

      //Address
      full_address,
      district,
      house_no,
      floor_no,
      flat_no,
    });
    return res
      .status(200)
      .json({ message: "Listing updated successfully", data: updatedListing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = editListing;
