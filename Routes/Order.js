const express = require("express");
const { check } = require("express-validator");
const { addOrder } = require("../Controller/Order/createOrder");
const { getAllOrders } = require("../Controller/Order/getOrder");
const { isAuth } = require("../Utils/isAuth");

const router = express.Router();

// Auth Routes
router.get("/", isAuth, getAllOrders);
router.post(
  "/",
  [isAuth, [check("phone", "Phone is required").not().isEmpty()]],
  addOrder
);

module.exports = router;
