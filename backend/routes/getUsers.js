const express = require("express");
const getAllUsers = require("../controller/getUsersController");
const getUserByIdController = require("../controller/getUserByIdController");
const { getUserStatsController } = require("../controller/getUserStatsController");

const router = express.Router();

// Register
router.get("/getUsers", getAllUsers);
router.get("/getUsers/:id", getUserByIdController); // Route to get a user by ID
router.get("/stats", getUserStatsController); // Route to get user statistics


module.exports = router;
