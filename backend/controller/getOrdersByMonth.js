// controllers/orderController.js
const Order = require("../model/Order");

const getOrdersByMonth = async (req, res) => {
  try {
    const ordersByMonth = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by the month of createdAt
          totalOrders: { $sum: 1 }, // Count the total orders
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month in ascending order
      },
    ]);

    // Convert month numbers to names for better readability
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    const formattedData = ordersByMonth.map((data) => ({
      month: monthNames[data._id - 1], // Convert month number to name
      totalOrders: data.totalOrders,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving orders by month", error });
  }
};

module.exports = { getOrdersByMonth };
