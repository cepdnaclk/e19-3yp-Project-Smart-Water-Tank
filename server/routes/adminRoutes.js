// backend/routes/admin_routes.js
const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model");
const authmiddleware = require("../middleware/authmiddleware");

console.log("Inside admin routes");

router.post("/get-all-users", authmiddleware, async (req, res) => {
  console.log("Inside get all users");

  try {
    const users = await userModel.find({ isAdministrator: false });
    res.status(200).send({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).send({ message: "Error reading data", success: false, err });
  }
});

router.post("/get-all-admin", authmiddleware, async (req, res) => {
  console.log("Inside get all admins");

  try {
    const admins = await userModel.find({ isAdministrator: true });
    res.status(200).send({
      success: true,
      data: admins,
    });
  } catch (err) {
    res.status(500).send({ message: "Error reading data", success: false, err });
  }
});
module.exports = router;
