const express = require("express");
const { check } = require("express-validator");
const getAllReqMod = require("../Controller/Request/getAllReqMod");
const createReq = require("../Controller/Request/createReq");
const { isAuth } = require("../Utils/isAuth");
const getRequestDetails = require("../Controller/Request/getRequestDetails");
const changeStatus = require("../Controller/Request/changeStatus");
const getMyReq = require("../Controller/Request/getMyReq");
const getRecentReq = require("../Controller/Request/getRecentReq");
const upload = require("../config/multer");

const router = express.Router();

// Auth Routes
router.get("/mod/:status", isAuth, getAllReqMod);
router.get("/my", isAuth, getMyReq);
router.get("/recent", isAuth, getRecentReq);
router.get("/:id", isAuth, getRequestDetails);
router.patch("/:id", isAuth, changeStatus);
router.post(
  "/:packId",
  [
    isAuth,
    upload.single("document"),
    [
      check("phone", "Phone is required").not().isEmpty(),
      check("name", "Name is required").not().isEmpty(),
      check("occupation", "Occupation is required").not().isEmpty(),
    ],
  ],
  createReq
);

module.exports = router;
