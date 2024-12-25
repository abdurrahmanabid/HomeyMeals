const User = require("../model/User");

// Delete a user
const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from the route parameter
    const user = await User.findByIdAndDelete(id); // Find and delete user by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = deleteUserController;
