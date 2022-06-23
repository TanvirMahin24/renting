const express = require("express");
const { check } = require("express-validator");
const {
  getAllSubscribers,
  addSubscriber,
} = require("../Controller/Subscribe/Subscribe");
const { isAuth } = require("../Utils/isAuth");

const router = express.Router();

// Auth Routes
router.get("/", isAuth, getAllSubscribers);
router.post(
  "/",
  [check("phone", "Phone is required").not().isEmpty()],
  addSubscriber
);

module.exports = router;
