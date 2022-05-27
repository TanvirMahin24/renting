const Pack = require("../../Model/Listing.model");
const fs = require("fs");
const path = require("path");

const deletePack = async (req, res) => {
  try {
    const pack = await Pack.findByPk(req.params.id);
    if (!pack) {
      return res.status(404).json({
        message: "Pack not found",
      });
    }
    // delete image
    fs.unlinkSync(
      path.resolve(
        __dirname,
        "../../",
        "uploads",
        `${pack.image.split("/")[pack.image.split("/").length - 1]}`
      )
    );

    await pack.destroy();
    return res.status(200).json({
      message: "Pack deleted successfully",
    });
  } catch (error) {
    //console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = deletePack;
