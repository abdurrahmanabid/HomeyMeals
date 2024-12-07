const User = require("../model/User"); // Import the User model
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

// Login user
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user._id, role: user.role });
    res
      .cookie("token", token, { httpOnly: true, secure: true })
      .json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = loginController;
