const Pack = require("../../Model/Listing.model");
const Keyword = require("../../Model/Keyword.model");
const getPackDetails = async (req, res) => {
  // Fetch Pack
  try {
    const pack = await Pack.findByPk(req.params.id, { include: Keyword });
    //console.log(pack, req.params.id);
    if (!pack) {
      return res.status(404).json({
        message: "Pack not found",
      });
    }
    // Send Response
    return res.status(200).json({
      success: true,
      data: pack,
    });
  } catch (error) {
    // Send Error
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getPackList = async (req, res) => {
  // Fetch all packs paginated
  try {
    let { limit, page } = req.query;

    // Default query params
    if (!limit) {
      limit = 10;
    }
    if (!page) {
      page = 1;
    }

    // Converting params to integer
    limit = parseInt(limit);
    page = parseInt(page);

    // Determining offset
    let offset = (page - 1) * limit;

    // Fetch paginated list
    const packList = await Pack.findAndCountAll({
      limit,
      offset,
    });

    // Send Error Response
    if (!packList) {
      return res.status(404).json({
        message: "Packs not found",
      });
    }
    // Send Response
    return res.status(200).json({
      success: true,
      data: packList,
    });
  } catch (error) {
    // Send Error
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = { getPackDetails, getPackList };
