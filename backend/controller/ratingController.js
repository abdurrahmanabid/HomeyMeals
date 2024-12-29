const Rating = require("../model/Rating");

// Create a new rating
exports.createRating = async (req, res) => {
  try {
    const { studentId, itemId, review, star } = req.body;

    if (!studentId || !itemId || !star) {
      return res
        .status(400)
        .json({ message: "studentId, itemId, and star are required." });
    }

    const newRating = await Rating.create({ studentId, itemId, review, star });
    res
      .status(201)
      .json({ message: "Rating created successfully", data: newRating });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create rating", error: error.message });
  }
};

// Get all ratings
exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find()
      .populate("studentId")
      .populate("itemId");
    res.status(200).json({ data: ratings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch ratings", error: error.message });
  }
};

// Get ratings by Food Item ID
exports.getRatingsByItemId = async (req, res) => {
  try {
    const { itemId } = req.params;

    const ratings = await Rating.find({ itemId })
      .populate("studentId") // Populate student details
      .populate("itemId"); // Populate item details

    res.status(200).json({ ratings });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch ratings for the item",
      error: error.message,
    });
  }
};

// Update a rating
exports.updateRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    const { review, star } = req.body;

    const updatedRating = await Rating.findByIdAndUpdate(
      ratingId,
      { review, star },
      { new: true, runValidators: true }
    );

    if (!updatedRating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res
      .status(200)
      .json({ message: "Rating updated successfully", data: updatedRating });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update rating", error: error.message });
  }
};

// Delete a rating
exports.deleteRating = async (req, res) => {
  try {
    const { ratingId } = req.params;

    const deletedRating = await Rating.findByIdAndDelete(ratingId);

    if (!deletedRating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete rating", error: error.message });
  }
};
// Get Average Rating of a Meal
exports.getAverageRatingByItemId = async (req, res) => {
  try {
    const { itemId } = req.params;

    if (!itemId) {
      return res.status(400).json({ message: "itemId is required." });
    }

    const ratings = await Rating.find({ itemId });

    if (ratings.length === 0) {
      return res
        .status(404)
        .json({ message: "No ratings found for this meal." });
    }

    const totalStars = ratings.reduce((acc, rating) => acc + rating.star, 0);
    const averageRating = totalStars / ratings.length;

    res.status(200).json({
      itemId,
      averageRating: averageRating.toFixed(2),
      totalRatings: ratings.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to calculate average rating",
      error: error.message,
    });
  }
};
