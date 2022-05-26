const Subscriber = require("../../Model/Subscribers.model");
const { validationResult } = require("express-validator");

const getAllSubscribers = async (req, res) => {
  // Fetch all subscribers
  try {
    const subscribers = await Subscriber.findAll();

    // Send Response
    res.status(200).json({
      success: true,
      data: subscribers,
    });
  } catch (error) {
    // Send Error
    res.status(500).json({
      message: "Error fetching subscribers",
    });
  }
};

const addSubscriber = async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { email } = req.body;
  // Check if user exist
  try {
    const subs = await Subscriber.findAll({ where: { email } });
    if (subs.length > 0) {
      res.status(400).json({
        message: "Email already exist",
      });
      return;
    } else {
      // Add new subscriber
      const newSub = await Subscriber.create({ email });
      // Send Response
      res.json({ data: newSub });
      return;
    }
  } catch (error) {
    // Send Error
    res.status(500).json({
      message: "Error adding subscriber",
    });
  }
};

module.exports = {
  getAllSubscribers,
  addSubscriber,
};
