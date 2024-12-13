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
    category: {
      type: String,
      default: "N/A",
    },
    stock: {
      type: String,
      enum: ["active", "stock-out"],
      default: "active",
    },
    image: {
      data: Buffer, // Store image as binary data
      contentType: String, // Store the type of the image (e.g., 'image/jpeg')
    },

    status: {
      type: String,
      enum: ["pending", "approved", "idle"],
      required: true,
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt timestamps

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;
