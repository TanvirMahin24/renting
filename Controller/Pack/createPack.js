const { validationResult } = require("express-validator");
const Pack = require("../../Model/Listing.model");

const createPack = async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  // Form data
  const {
    title,
    description,
    slug,
    price,
    originalPrice,
    keywords,
    target,
    targetPrice,
  } = req.body;

  console.log(keywords);

  // Check Pack slug exist or not
  try {
    const newPack = await Pack.findAll({ where: { slug: slug } });
    if (newPack.length > 0) {
      return res.status(400).json({
        message: "Slug is already used",
      });
    } else {
      // Check file exists or not
      const image = req.file;
      if (!image) {
        return res.status(400).json({
          message: "Image is required",
        });
      }
      // Create new Pack
      const finalPack = await Pack.create({
        title,
        description,
        slug,
        price,
        originalPrice,
        image: `${process.env.SERVER_DOMAIN}/api/uploads/${image.filename}`,
        target,
        targetPrice,
      });

      // Create Pack keywords
      try {
        keywords.map(async (item) => {
          await finalPack.createKeyword({ name: item });
        });
      } catch (error) {
        console.log(error);
      }
      await finalPack.save();

      return res.status(200).json({
        message: "Pack created successfully",
        data: finalPack,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { createPack };
