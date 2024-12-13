const express = require("express");
const multer = require("multer");
const postAItemController = require("../controller/postAItemController");
const getAItemController = require("../controller/getAItemController");
const getAllItemController = require("../controller/getAllItemController");
const deleteItemController = require("../controller/deleteItemController");
const updateItemController = require("../controller/updateItemController");
const getSellerItemsController = require("../controller/getSellerItemsController");
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
router.delete("/delete/:itemId", deleteItemController);
router.put(
  "/update-item/:itemId",
  upload.single("image"),
  updateItemController
);
router.get("/items/seller/:sellerId", getSellerItemsController);

module.exports = router;
