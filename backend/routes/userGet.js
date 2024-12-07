const express = require("express");
const authUserController = require("../controller/authUserController");

const router = express.Router();

// Register
router.get("/getAuth/:id", authUserController);

module.exports = router;
