const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authmiddleware = require("../middleware/authmiddleware");

console.log("Inside user routes");

router.post("/register", async (req, res) => {
  try {
    const userExists = await userModel.findOne({ email: req.body.email });

    if (userExists) {
      return res
        .status(200)
        .json({ message: "Email already exists", success: false });
    } else {
      const password = req.body.password;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
      const newUser = new userModel(req.body);
      await newUser.save();
      res
        .status(200)
        .send({ message: "User registered successfully", success: true });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error creating user", success: false, err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "User doesn't exists", success: false });
    } else {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return res
          .status(200)
          .json({ message: "Incorrect Password", success: false });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h", // Remove the extra space here
        });

        return res
          .status(200)
          .send({ message: "Login Succesfully", success: true, data: token });
      }
    }
  } catch (err) {
    res.status(500).send({ message: "Error Login user", success: false, err });
  }
});

router.post("/get-user-info-by-id", authmiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    user.password = undefined;

    if (!user) {
      return res.status(200).send({
        message: "User doesn't exists",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error Login user",
      success: false,
      error,
    });
  }
});



router.post("/mark-all-notification-seen", authmiddleware, async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const unreadNotifications = user.unreadNotifications;
    const seenNotifications = user.seenNotifications;
    seenNotifications.push(...unreadNotifications);
    user.unreadNotifications = [];
    user.seenNotifications = seenNotifications; 
    const updatedUser = await user.save(); 
    updatedUser.password = undefined;

    console.log(updatedUser);

    res.status(200).send({
      success: true,
      message: "Marked as read",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).send({ message: "Error read data", success: false, err });
  }
});

router.post("/delete-all-notification", authmiddleware, async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.unreadNotifications = [];
    user.seenNotifications = [];
    const updateUser = await user.save();
    updateUser.password = undefined;

    res.status(200).send({
      success: true,
      message: "Marked as read",
      data: updateUser,
    });
  } catch (err) {
    res.status(500).send({ message: "Error read data", success: false, err });
  }
});




module.exports = router;
