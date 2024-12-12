const express = require("express");
const FoodItem = require("../model/Item"); // Import the FoodItem model
const router = express.Router();

// GET all food items
const getAllItemController = async (req, res) => {
  try {
    const items = await FoodItem.find(); // Fetch all food items from the database
    if (!items.length) {
      return res.status(404).json({ message: "No food items found" });
    }
    res.status(200).json(items); // Return the items as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch food items" });
  }
};

module.exports = getAllItemController;
