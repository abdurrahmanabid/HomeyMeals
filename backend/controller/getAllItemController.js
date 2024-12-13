const express = require("express");
const FoodItem = require("../model/FoodItem"); // Import the FoodItem model
const router = express.Router();

// GET all food items
const getAllItemController = async (req, res) => {
  try {
    const items = await FoodItem.find(); // Fetch all food items from the database
    if (!items.length) {
      return res.status(404).json({ message: "No food items found" });
    }

    // Process items to include image preview but exclude full image field
    const itemsWithImagePreview = items.map((item) => {
      const plainItem = item.toObject(); // Convert Mongoose document to plain object
      delete plainItem.image; // Exclude the full image field

      if (item.image && item.image.data && item.image.data.length > 0) {
        const base64Image = item.image.data.toString("base64");
        plainItem.imagePreview = `data:${item.image.contentType};base64,${base64Image}`;
      } else {
        plainItem.imagePreview = null; // Optional: Provide a default value
      }

      return plainItem;
    });

    res.status(200).json(itemsWithImagePreview); // Return processed items
  } catch (error) {
    console.error("Error fetching food items:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch food items", details: error.message });
  }
};

module.exports = getAllItemController;
