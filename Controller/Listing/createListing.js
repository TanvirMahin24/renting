const { validationResult } = require("express-validator");
const Listing = require("../../Model/Listing.model");

// Create Listing with multiple files
const createListing = async (req, res) => {
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

  if (!files) {
    return res.status(400).json({ message: "Images are required" });
  }

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
  }

  // Create new Listing
  const finalListing = await Listing.create({
    title,
    categoryId: category,
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
    userId: req.user.id,
    slug,
    preview_image: `${process.env.SERVER_DOMAIN}/api/uploads/${preview_image[0].filename}`,
  });

  try {
    console.log(keywords);
    console.log(requirements);
    if (typeof keywords === "string") {
      await finalListing.createKeyword({ name: item });
    } else {
      await keywords.map(async (item) => {
        await finalListing.createKeyword({ name: item });
      });
    }

    if (typeof requirements === "string") {
      await finalListing.createRequirement({ name: item });
    } else {
      // Create Listing Requirements
      requirements.map(async (item) => {
        await finalListing.createRequirement({ name: item });
      });
    }

    // Create Listing images
    files.map(async (item) => {
      await finalListing.createImage({
        image: `${process.env.SERVER_DOMAIN}/api/uploads/${item.filename}`,
      });
    });
  } catch (error) {
    console.log(error);
  }
  await finalListing.save();

  // Send success response
  return res.status(200).json({
    message: "Listing created successfully",
    data: finalListing,
  });
};

module.exports = createListing;
