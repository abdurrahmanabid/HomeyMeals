const express = require("express");
const FoodItem = require("../model/FoodItem"); // Import the FoodItem model
const router = express.Router();

// DELETE a specific food item by ID
const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Find and delete the item
    const deletedItem = await FoodItem.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    res
      .status(200)
      .json({ message: "Food item deleted successfully", item: deletedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the food item" });
  }
};

module.exports = deleteItemController;
