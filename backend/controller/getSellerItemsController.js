const FoodItem = require("../model/FoodItem");

const getSellerItemsController = async (req, res) => {
  try {
    const { sellerId } = req.params;

    // Find items by sellerId
    const items = await FoodItem.find({ sellerId });

    if (!items || items.length === 0) {
      return res
        .status(404)
        .json({ message: "No items found for this seller" });
    }

    // Process items to include image preview but exclude full image data
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

    res.status(200).json({ items: itemsWithImagePreview });
  } catch (error) {
    console.error("Error fetching seller items:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch items", details: error.message });
  }
};

module.exports = getSellerItemsController;
