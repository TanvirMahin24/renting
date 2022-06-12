const Listing = require("../../Model/Listing.model");
const path = require("path");
const fs = require("fs");
const Image = require("../../Model/Image.model");
const Keyword = require("../../Model/Keyword.model");
const Requirement = require("../../Model/Requirement.model");

const deleteListing = async (req, res) => {
  // Get the id from the url
  const { id } = req.params;

  try {
    // Check listing is belongs to the user
    const listing = await Listing.findByPk(id, {
      include: [Image, Keyword, Requirement],
    });
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // console.log(listing);

    // Check user id is same as the user id in the listing
    if (listing.userId !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Delete the image
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
    const resTest = listing.images.map(async (item) => {
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

    console.log(resTest);

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

    return res.status(200).json({ message: "Listing deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteListing;
