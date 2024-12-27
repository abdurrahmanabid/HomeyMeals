const Order = require("../model/Order");

const getOrderController = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Query to find orders and populate relevant fields
    const orders = await Order.findById(orderId)
      .populate("studentId") // Populates student details
      .populate("sellerId") // Populates seller details
      .populate("riderId") // Populates rider details
      .populate("items._id"); // Populates FoodItem details for each item in the order

    // Log the populated orders to debug
    // console.log("Populated Orders:", orders);

    // Send the populated orders back in the response
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching orders",
      error: err.message,
    });
  }
};

module.exports = getOrderController;
