const express = require("express");
const { check } = require("express-validator");
const { isAdmin } = require("../Utils/isAuth");
const { createCategory } = require("../Controller/Category/createCategory");
const { updateCategory } = require("../Controller/Category/updateCategory");
const { getAllCategories } = require("../Controller/Category/getCategory");
const { deleteCategory } = require("../Controller/Category/deleteCategory");

const router = express.Router();

// Auth Routes
router.post(
  "/",
  [isAdmin, [check("name", "Category name is required").not().isEmpty()]],
  createCategory
);

router.get("/", getAllCategories);
router.patch(
  "/:id",
  [isAdmin, [check("name", "Category name is required").not().isEmpty()]],
  updateCategory
);
router.delete("/:id", isAdmin, deleteCategory);

module.exports = router;
