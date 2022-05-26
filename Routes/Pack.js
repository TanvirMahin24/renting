const express = require("express");
const { check } = require("express-validator");
const { isAdmin } = require("../Utils/isAuth");
const upload = require("../config/multer");
const { createPack } = require("../Controller/Pack/createPack");
const {
  getPackDetails,
  getPackList,
} = require("../Controller/Pack/getPackDetails");
const updatePack = require("../Controller/Pack/updatePack");
const deletePack = require("../Controller/Pack/deletePack");

const router = express.Router();

// Auth Routes
router.post(
  "/",
  [
    isAdmin,
    upload.single("image"),
    [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("slug", "Slug is required").not().isEmpty(),
      check("price", "Price is required").not().isEmpty(),
      check("originalPrice", "Original Price is required").not().isEmpty(),
    ],
  ],
  createPack
);

router.get("/", getPackList);
router.get("/:id", getPackDetails);
router.patch(
  "/:id",
  [
    isAdmin,
    upload.single("image"),
    [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("slug", "Slug is required").not().isEmpty(),
      check("price", "Price is required").not().isEmpty(),
      check("originalPrice", "Original Price is required").not().isEmpty(),
    ],
  ],
  updatePack
);
router.delete("/:id", isAdmin, deletePack);

module.exports = router;
