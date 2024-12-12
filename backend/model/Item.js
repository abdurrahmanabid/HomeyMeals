const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: 0, // Optional field with default value
    },
    image: {
      data: Buffer, // Store image as binary data
      contentType: String, // Store the type of the image (e.g., 'image/jpeg')
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt timestamps

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;
