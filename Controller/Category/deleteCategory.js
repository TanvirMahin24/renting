const Category = require("../../Model/Category.model");

const deleteCategory = async (req, res) => {
  try {
    // Find Category
    const category = await Category.findByPk(req.params.id);

    // Check if no category found
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // delete category
    await category.destroy();

    // Success response
    return res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { deleteCategory };
