const Contact = require("../../Model/Contact.model");
const { validationResult } = require("express-validator");

const getAllContact = async (req, res) => {
  // Fetch all contacts
  try {
    const contacts = await Contact.findAll();

    // Send Response
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    // Send Error
    res.status(500).json({
      message: "Error fetching contacts",
    });
  }
};

const submitContact = async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { name, email, message } = req.body;
  // Check if user exist
  try {
    // Add new contact
    const newContact = await Contact.create({
      name,
      email,
      message,
      userId: req.user && req.user.id ? req.user.id : null,
    });

    // Send Response
    res.json({ data: newContact });
    return;
  } catch (error) {
    //console.log(error);
    // Send Error
    res.status(500).json({
      message: "Error adding contact",
    });
  }
};

const submitReply = async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { reply } = req.body;
  const { id } = req.params;
  // Check if user exist
  try {
    // Find contact using ID
    const contact = await Contact.findByPk(id);

    // if contact not found
    if (!contact) {
      res.status(404).json({
        message: "Contact not found",
      });
      return;
    }

    // Update contact
    await contact.update({
      reply,
    });

    // Send Response
    res.json({ data: newContact });
    return;
  } catch (error) {
    // Send Error
    res.status(500).json({
      message: "Error updating contact",
    });
  }
};

module.exports = {
  getAllContact,
  submitContact,
  submitReply,
};
