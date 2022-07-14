const User = require("../../Model/User.model");
const Listing = require("../../Model/Listing.model");
const Request = require("../../Model/Request.model");
const Subscribers = require("../../Model/Subscribers.model");
const Contact = require("../../Model/Contact.model");

const getDashboardAdmin = async (req, res) => {
  // Fetch all users
  try {
    const userCount = await User.count({
      where: { role: "user" },
    });

    const packCount = await Listing.count();

    const pendingCount = await Request.count({
      where: { status: "pending" },
    });

    const approvedCount = await Request.count({
      where: { status: "approved" },
    });

    const rejectedCount = await Request.count({
      where: { status: "rejected" },
    });

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
