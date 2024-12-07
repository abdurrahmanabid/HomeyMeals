const User = require("../model/User");

// Register a new user
const authUserController = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from URL params
    const user = await User.findById(userId); // Find the user by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Send the user data as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = authUserController;
