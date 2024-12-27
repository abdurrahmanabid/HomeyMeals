// controllers/userController.js
const User = require("../model/User");

const getUserStatsController = async (req, res) => {
  try {
    // Get total user count
    const totalUsers = await User.countDocuments();

    // Get count of each role
    const studentCount = await User.countDocuments({ role: "Student" });
    const sellerCount = await User.countDocuments({ role: "Seller" });
    const riderCount = await User.countDocuments({ role: "Rider" });

    res.status(200).json({
      totalUsers,
      studentCount,
      sellerCount,
      riderCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user statistics", error });
  }
};

module.exports = {
  getUserStatsController,
};
