const express = require("express");
const multer = require("multer");
const postAItemController = require("../controller/postAItemController");
const getAItemController = require("../controller/getAItemContoller");
const getAllItemController = require("../controller/getAllItemController");
const router = express.Router();

// Multer storage configuration
const storage = multer.memoryStorage(); // Store image in memory as Buffer
const upload = multer({ storage: storage });

// POST a food item with sellerId from params
router.post(
  "/:sellerId/post-a-item",
  upload.single("image"),
  postAItemController
);
router.get("/get-item/:itemId", getAItemController);
router.get("/items", getAllItemController);

module.exports = router;
