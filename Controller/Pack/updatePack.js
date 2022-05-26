const Pack = require("../../Model/Pack.model");
const fs = require("fs");
const { validationResult } = require("express-validator");
const path = require("path");

const updatePack = async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  // Fetch Pack
  const { title, description, slug, price, originalPrice } = req.body;
  const image = req.file;
  try {
    const pack = await Pack.findByPk(req.params.id);
    //console.log(pack, req.params.id);
    if (!pack) {
      return res.status(404).json({
        message: "Pack not found",
      });
    }

    // Delete old img
    if (image) {
      fs.unlinkSync(
        path.resolve(
          __dirname,
          "../../",
          "uploads",
          `${pack.image.split("/")[pack.image.split("/").length - 1]}`
        )
      );
    }

    // Update Pack
    const updatedPack = await pack.update({
      title,
      description,
      slug,
      price,
      originalPrice,
      image: image
        ? `${process.env.SERVER_DOMAIN}/api/uploads/${image.filename}`
        : pack.image,
    });

    // Send Response
    return res.status(200).json({
      success: true,
      data: updatedPack,
    });
  } catch (error) {
    // Send Error
    //console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = updatePack;
