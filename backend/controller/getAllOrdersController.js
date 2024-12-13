const Order = require("../model/Order");

const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find().populate(
      "studentId sellerId riderId items.itemId"
    );
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
};
module.exports = getAllOrdersController;
