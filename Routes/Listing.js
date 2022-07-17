const express = require("express");
const { check } = require("express-validator");
const { isAuth } = require("../Utils/isAuth");
const upload = require("../config/multer");

const updatePack = require("../Controller/Pack/updatePack");
const createListing = require("../Controller/Listing/createListing");
const getListingDetails = require("../Controller/Listing/getListingDetails");
const getAllListings = require("../Controller/Listing/getListing");
const searchListing = require("../Controller/Listing/searchListing");
const getMyListings = require("../Controller/Listing/getMyListings");
const deleteListing = require("../Controller/Listing/deleteListing");
const filterListing = require("../Controller/Listing/filterListing");
const getFavListing = require("../Controller/Listing/getFavListing");

const router = express.Router();

// Auth Routes
router.post(
  "/",
  [
    isAuth,
    upload.fields([
      { name: "image", maxCount: 8 },
      { name: "preview_image", maxCount: 1 },
    ]),
    [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("category", "Category is required").not().isEmpty(),
      check("keywords", "Keywords are required").not().isEmpty(),
      check("requirements", "requirements are required").not().isEmpty(),
      check("size", "Size is required").not().isEmpty(),
      check("price", "Price is required").not().isEmpty(),
      check("sublet", "Sublet is required").not().isEmpty(),
      check("bedrooms", "Bedrooms is required").not().isEmpty(),
      check("bathrooms", "Bathrooms is required").not().isEmpty(),
      check("full_address", "Full address is required").not().isEmpty(),
      check("district", "district is required").not().isEmpty(),
      check("house_no", "house_no is required").not().isEmpty(),
    ],
  ],
  createListing
);
router.get("/fav", getFavListing);
router.get("/", getAllListings);
router.get("/search", searchListing);
router.get("/filter", filterListing);
router.get("/my", isAuth, getMyListings);
router.get("/:slug", getListingDetails);
router.patch(
  "/:id",
  [
    isAuth,
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
router.delete("/:id", isAuth, deleteListing);

module.exports = router;
