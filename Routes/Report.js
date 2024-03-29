const express = require("express");
const { check } = require("express-validator");
const { isAuth, isAdmin } = require("../Utils/isAuth");

const createReport = require("../Controller/Report/createReport");
const getReport = require("../Controller/Report/getReport");
const deleteReport = require("../Controller/Report/deleteReport");

const router = express.Router();

// Auth Routes

router.post(
  "/:id",
  isAuth,
  [check("message", "Message is required").not().isEmpty()],

  createReport
);

router.get("/", isAdmin, getReport);
router.delete("/:id", isAdmin, deleteReport);

module.exports = router;
