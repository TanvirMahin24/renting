const Listing = require("../../Model/Listing.model");
const Category = require("../../Model/Category.model");
const { Op } = require("sequelize");
const districts = require("../../constants/Districts");

const filterListing = async (req, res) => {
  const { category, start, end, district, division, sublet } = req.query;

  // Default limits
  const limitStart = start ? parseInt(start) : 0;
  const limitEnd = end ? parseInt(end) : 1000000;

  try {
    // Filter Listings by the params sequalize query
    const districtList = [];

    if (district) {
      districtList.push(parseInt(district));
    }

    if (division) {
      districts
        .filter((dis) => parseInt(dis.division_id) === parseInt(division))
        .map((dis) => districtList.push(parseInt(dis.id)));
    }

    if (districtList.length === 0) {
      districts.map((dis) => districtList.push(parseInt(dis.id)));
    }

    // Get all listings
    const listingsResult = await Listing.findAndCountAll({
      where: {
        approved: "approved",
        price: { [Op.gte]: limitStart, [Op.lte]: limitEnd },
        district: {
          [Op.in]: districtList,
        },
        categoryId: category ? category : { [Op.ne]: null },
        sublet: sublet
          ? parseInt(sublet) > 0
            ? true
            : false
          : { [Op.ne]: null },
      },
      include: [
        {
          model: Category,
          attributes: ["name", "id"],
        },
      ],
      order: [["id", "DESC"]],
    });
    // Send Error Response
    if (!listingsResult) {
      return res.status(404).json({
        message: "Listings not found",
      });
    }
    // Send Response
    return res.status(200).json({
      success: true,
      data: listingsResult,
    });
  } catch (error) {
    console.log(error);
    // Send Error
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = filterListing;
