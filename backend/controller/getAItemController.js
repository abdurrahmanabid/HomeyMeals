const express = require("express");
const FoodItem = require("../model/FoodItem");
const router = express.Router();

// GET request to fetch a food item by its ID
const getAItemController = async (req, res) => {
  try {
    const { itemId } = req.params; // Get the itemId from URL params
    const item = await FoodItem.findById(itemId); // Search for the item in the DB by its ID

    // If item is not found, return 404 error
    if (!item) {
      return res.status(404).json({ error: "Food item not found" });
    }

    // Respond with the food item data, including the image as Base64
    const itemData = {
      itemName: item.itemName,
      description: item.description,
      price: item.price,
      discountPrice: item.discountPrice,
      imageBase64: item.image
        ? `data:${item.image.contentType};base64,${item.image.data.toString(
            "base64"
          )}`
        : null, // Convert image buffer to Base64 string
    };

    res.status(200).json(itemData); // Return the food item data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the food item" });
  }
};

module.exports = getAItemController;
