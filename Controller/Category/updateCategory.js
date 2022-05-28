const { validationResult } = require("express-validator");
const Category = require("../../Model/Category.model");

const updateCategory = async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    // Form data
    const { name } = req.body;

    // Find Category
    const category = await Category.findByPk(req.params.id);

    // Check if no category found
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // update new Category
    const finalCategory = await category.update({
      name,
    });

    // Success response
    return res.status(200).json({
      message: "Category updated successfully",
      data: finalCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { updateCategory };
