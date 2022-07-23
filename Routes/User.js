const express = require("express");
const ResetLinkSend = require("../Controller/Auth/ResetLinkSend");
const { getDashboardAdmin } = require("../Controller/User/dashboardAdmin");
const { deleteUser } = require("../Controller/User/deleteUser");
const { changeUserRole } = require("../Controller/User/editUser");
const {
  getAuthUser,
  getAllUser,
} = require("../Controller/User/getUserDetails");
const resetPassword = require("../Controller/User/updatePassword");
const {
  updateProfile,
  updatePassword,
} = require("../Controller/User/updateUser");
const { isAdmin, isAuth } = require("../Utils/isAuth");

const router = express.Router();

// Auth Routes
router.get("/auth", getAuthUser);
router.post("/reset", ResetLinkSend);
router.post("/password/:token", resetPassword);
router.get("/dashboard", isAdmin, getDashboardAdmin);
router.get("/", getAllUser);
router.post("/role/:id", isAdmin, changeUserRole);
router.patch("/password", isAuth, updatePassword);
router.patch("/:id", isAuth, updateProfile);
router.delete("/:id", isAdmin, deleteUser);

module.exports = router;
