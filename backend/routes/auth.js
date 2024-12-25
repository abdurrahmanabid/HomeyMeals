const express = require("express");
const User = require("../model/User");
const { generateToken, verifyToken } = require("../utils/jwt");
const registrationController = require("../controller/registrationController");
const loginController = require("../controller/loginController");
const deleteUserController = require("../controller/deleteUserRoutes");

const router = express.Router();

// Register
router.post("/register", registrationController);

// Login
router.post("/login", loginController);

// Protected Route Example
router.get("/protected", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const user = verifyToken(token);
    res.json({ message: "Access granted", user });
  } catch {
    res.status(400).json({ message: "Invalid token" });
  }
});

router.delete("/delete/:id", deleteUserController);


// Logout
router.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
