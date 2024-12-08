const express = require("express");
const getAllUsers = require("../controller/getUsersController");

const router = express.Router();

// Register
router.get("/getUsers", getAllUsers);

module.exports = router;
