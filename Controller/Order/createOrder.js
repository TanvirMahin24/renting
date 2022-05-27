const { validationResult } = require("express-validator");
const Order = require("../../Model/Request.model");
const Pack = require("../../Model/Listing.model");
const User = require("../../Model/User.model");

const addOrder = async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  // check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: "Not Authenticated" });
  }

  const { phone, pack } = req.body;
  // Check if order exist
  try {
    const orderPrev = await Order.findAll({
      where: { phone, userId: req.user.id, packId: pack },
    });
    if (orderPrev.length > 0) {
      res.status(400).json({
        message: "Order already exists",
      });
      return;
    } else {
      // Add new Order
      const newOrder = await Order.create({
        phone,
        packId: pack,
        userId: req.user.id,
      });

      // get Order details
      const orderDetails = await Order.findOne({
        where: { id: newOrder.id },
        include: [
          {
            model: Pack,
          },
          {
            model: User,
            exclude: ["password", "salt"],
          },
        ],
      });

      // Send Response
      res.json({ data: orderDetails });
      return;
    }
  } catch (error) {
    // Send Error
    console.log(error);
    res.status(500).json({
      message: "Error adding Order",
    });
  }
};

module.exports = { addOrder };
