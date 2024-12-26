const User = require("../model/User");
const FoodItem = require("../model/FoodItem");

const postAItemController = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { itemName, description, price, discountPrice, category } = req.body;

    // Check if the seller exists
    const sellerExists = await User.findById(sellerId);
    if (!sellerExists) {
      return res.status(404).json({ error: "Seller not found" });
    }

    // Ensure an image was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    // Create a new food item
    const newItem = new FoodItem({
      sellerId,
      itemName,
      description,
      category,
      price: parseFloat(price),
      discountPrice: parseFloat(discountPrice) || 0,
      status: "pending",
      image: {
        data: req.file.buffer, // Save the file buffer (image data)
        contentType: req.file.mimetype, // MIME type (e.g., 'image/jpeg')
      },
    });

    // Save the item
    await newItem.save();
    res
      .status(201)
      .json({ message: "Food item added successfully!", item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add the food item" });
  }
};

module.exports = postAItemController;
