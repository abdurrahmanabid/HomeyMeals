const Order = require("../model/Order"); // Replace with the path to your Order model
const moment = require("moment");

const getWeeklyData = async (req, res) => {
  try {
    // Aggregate data by week
    const weeklyData = await Order.aggregate([
      {
        $group: {
          _id: {
            week: { $week: "$createdAt" }, // Group by week of the year
            year: { $year: "$createdAt" }, // Group by year to avoid overlapping weeks
          },
          totalOrders: { $sum: 1 }, // Count total orders
          totalSales: { $sum: "$totalPrice" }, // Sum of sales (assuming totalPrice exists)
        },
      },
      {
        $sort: { "_id.year": 1, "_id.week": 1 }, // Sort by year and week
      },
    ]);

    // Format the response for the frontend
    const formattedData = weeklyData.map((data) => {
      const weekStart = moment()
        .year(data._id.year)
        .week(data._id.week)
        .startOf("week")
        .format("MMM D");
      const weekEnd = moment()
        .year(data._id.year)
        .week(data._id.week)
        .endOf("week")
        .format("MMM D");

      return {
        week: `${weekStart} - ${weekEnd}`, // Format week range (e.g., "Jan 1 - Jan 7")
        orders: data.totalOrders,
        sales: data.totalSales,
      };
    });

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching weekly data:", error);
    res.status(500).json({ message: "Error fetching weekly data", error });
  }
};

module.exports = { getWeeklyData };
