const Order = require("../model/Order");

// Delete an order
const deleteOrderController = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order deleted successfully", deletedOrder });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error deleting order", error: err.message });
  }
};

module.exports = deleteOrderController;
