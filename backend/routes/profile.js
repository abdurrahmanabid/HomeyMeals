const express = require("express");
const router = express.Router();
const postProfileController = require("../controller/postProfileController");
const multer = require("multer");
const getProfileController = require("../controller/getProfileController");
const updateProfileForMap = require("../controller/updateProfileForMap");
const { getAllProfiles } = require("../controller/getAllProfiles");

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/post/:userId",
  upload.single("profilePicture"),
  postProfileController
);

router.get("/get/:userId", getProfileController);
router.put("/map/put/:userId", updateProfileForMap);
router.get("/getAllProfiles", getAllProfiles);

module.exports = router;
