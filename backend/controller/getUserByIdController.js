const User = require("../model/User");

// Get user by ID
const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params; // Get the user ID from the route parameter
    const user = await User.findById(id); // Find the user by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Send the user data as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getUserByIdController;
