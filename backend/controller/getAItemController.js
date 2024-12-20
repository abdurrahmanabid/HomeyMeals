const express = require("express");
const FoodItem = require("../model/FoodItem");
const User = require("../model/User"); // Import the User model
const Profile = require("../model/Profile"); // Import the Profile model
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

    // Fetch the user information
    const user = await User.findById(item.sellerId); // Assuming item has a userId field

    // If user is not found, return 404 error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch the profile information
    const profile = await Profile.findOne({ userId: item.sellerId }); // Assuming profile has a userId field

    // If profile is not found, return 404 error
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    const { profilePicture, ...profileWithoutPicture } = profile._doc;
    const { password, ...userWithoutPassword } = user._doc;
    // Respond with the food item data, including the image as Base64, user info, and profile info
    const itemData = {
      id: item._id,
      itemName: item.itemName,
      description: item.description,
      price: item.price,
      discountPrice: item.discountPrice,
      imageBase64: item.image
        ? `data:${item.image.contentType};base64,${item.image.data.toString(
            "base64"
          )}`
        : null, // Convert image buffer to Base64 string
      user: {
        ...userWithoutPassword, // Spread to include other user fields
        ...profileWithoutPicture, // Spread to include other profile fields
      },
    };

    res.status(200).json(itemData); // Return the food item data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the food item" });
  }
};

module.exports = getAItemController;
