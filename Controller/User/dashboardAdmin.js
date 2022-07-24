const User = require("../../Model/User.model");
const Listing = require("../../Model/Listing.model");
const Request = require("../../Model/Request.model");
const Subscribers = require("../../Model/Subscribers.model");
const Contact = require("../../Model/Contact.model");
const Report = require("../../Model/Report.model");
const Reset = require("../../Model/Reset.model");

const getDashboardAdmin = async (req, res) => {
  // Fetch all users
  try {
    const userCount = await User.count({
      where: { role: "user" },
    });

    const packCount = await Listing.count();
    const listingPendingCount = await Listing.count({
      where: { approved: "pending" },
    });
    const listingApprovedCount = await Listing.count({
      where: { approved: "approved" },
    });
    const listingRejectedCount = await Listing.count({
      where: { approved: "rejected" },
    });

    const pendingCount = await Request.count({
      where: { status: "pending" },
    });
    const reqTimes = await Request.findAll({
      attributes: ["createdAt"],
    });
    const listingTimes = await Listing.findAll({
      attributes: ["createdAt"],
    });

    const approvedCount = await Request.count({
      where: { status: "approved" },
    });

    const rejectedCount = await Request.count({
      where: { status: "rejected" },
    });
    const reportCount = await Report.count();
    const resetCount = await Reset.count();

    const subscribersCount = await Subscribers.count();

    const contactCount = await Contact.count();

    // Send response
    return res.status(200).json({
      message: "Admin Data successfully",
      data: {
        users: userCount,
        packages: packCount,
        pending: pendingCount,
        approved: approvedCount,
        rejected: rejectedCount,
        subscribers: subscribersCount,
        contact: contactCount,
        report: reportCount,
        reset: resetCount,
        requestTime: reqTimes,
        listing: {
          pending: listingPendingCount,
          approved: listingApprovedCount,
          rejected: listingRejectedCount,
          time: listingTimes,
        },
      },
    });
  } catch (error) {
    // Send Error
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { getDashboardAdmin };
