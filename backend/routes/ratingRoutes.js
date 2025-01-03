const express = require("express");
const router = express.Router();
const {
  createRating,
  getAllRatings,
  getRatingsByItemId,
  updateRating,
  deleteRating,
  getAverageRatingByItemId,
} = require("../controller/ratingController");

// Create a new rating
router.post("/add-rating", createRating);

// Get all ratings
router.get("/", getAllRatings);

// Get ratings by Food Item ID
router.get("/item/:itemId", getRatingsByItemId);

// Update a rating
router.put("/:ratingId", updateRating);

// Delete a rating
router.delete("/:ratingId", deleteRating);
router.get("/average-rating/:itemId", getAverageRatingByItemId);

module.exports = router;
