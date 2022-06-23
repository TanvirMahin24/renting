const express = require("express");
const { check } = require("express-validator");
const {
  getAllContact,
  submitContact,
  submitReply,
} = require("../Controller/Contact/Contact");
const { isAuth } = require("../Utils/isAuth");

const router = express.Router();

// Auth Routes
router.get("/", isAuth, getAllContact);
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("message", "Message is required").not().isEmpty(),
  ],
  submitContact
);
router.patch(
  "/:id",
  [isAuth, [check("reply", "Reply is required").not().isEmpty()]],
  submitReply
);

module.exports = router;
