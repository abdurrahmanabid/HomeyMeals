const Order = require("../model/Order");

// Controller to fetch and process total orders
const getTotalOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    // Calculate total orders
    const totalOrders = orders.length;

    // Calculate total revenue
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    // Count orders by status
    const statusCounts = orders.reduce((counts, order) => {
      counts[order.status] = (counts[order.status] || 0) + 1;
      return counts;
    }, {});

    // Send the response
    res.status(200).json({
      totalOrders,
      totalRevenue: totalRevenue.toFixed(2),
      statusCounts,
    });
  } catch (error) {
    console.error("Error fetching total orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

module.exports = { getTotalOrders };
