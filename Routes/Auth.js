const express = require("express");
const passport = require("passport");
const { check } = require("express-validator");
const { registerController } = require("../Controller/Auth/Register");

const router = express.Router();

// Auth Routes
router.post(
  "/register",
  [
    check("first_name", "First name is required").not().isEmpty(),
    check("last_name", "Last name is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("phone", "Phone is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
  ],
  registerController
);
router.post(
  "/login",
  passport.authenticate("loginpassport", {
    successRedirect: "/api/user/auth",
    failWithError: true,
  }),
  function (err, req, res, next) {
    console.log(err);
    return res.json({ ...err, message: "Invalid Credentials" });
  }
);
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).clearCookie("connect.sid");
  res.status(200).json({
    message: "Logged out successfully",
  });
});

module.exports = router;
