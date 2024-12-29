const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Rating Schema
const RatingSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "FoodItem",
      required: true,
    },
    review: {
      type: String,
      trim: true,
    },
    star: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Export the Rating model
const Rating = model("Rating", RatingSchema);

module.exports = Rating;
