const express = require("express");
const getAllUsers = require("../controller/getUsersController");
const getUserByIdController = require("../controller/getUserByIdController");

const router = express.Router();

// Register
router.get("/getUsers", getAllUsers);
router.get("/getUsers/:id", getUserByIdController); // Route to get a user by ID


module.exports = router;
