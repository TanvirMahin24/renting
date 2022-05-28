const { validationResult } = require("express-validator");
const Category = require("../../Model/Category.model");
const createCategory = async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    // Form data
    const { name } = req.body;

    // Create new Category
    const finalCategory = await Category.create({
      name,
    });

    await finalCategory.save();

    // Success response
    return res.status(200).json({
      message: "Category created successfully",
      data: finalCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { createCategory };
