const FoodItem = require("../model/FoodItem"); // Import the FoodItem model

// Update Food Item Controller
const updateItemController = async (req, res) => {
  try {
    const { itemId } = req.params;
    const {
      itemName,
      description,
      price,
      discountPrice,
      category,
      status,
      stock,
    } = req.body;

    // Prepare the update fields
    const updateFields = {
      ...(itemName && { itemName }),
      ...(description && { description }),
      ...(price && { price: parseFloat(price) }),
      ...(discountPrice && { discountPrice: parseFloat(discountPrice) }),
      ...(category && { category }),
      ...(status && { status }),
      ...(stock && { stock }),
    };

    // Handle image update if a new image is provided
    if (req.file) {
      updateFields.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    // Find and update the food item
    const updatedItem = await FoodItem.findByIdAndUpdate(itemId, updateFields, {
      new: true, // Return the updated document
      runValidators: true, // Validate before updating
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    res
      .status(200)
      .json({ message: "Food item updated successfully", item: updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the food item" });
  }
};

module.exports = updateItemController;
