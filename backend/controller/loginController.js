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

    if (!user.emailVerify) {
      return res.status(403).json({ message: "Email not verified. Please verify your email before logging in." });
    }
    
    const token = generateToken({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      createDate: user.createDate,
      phone: user.phone,
    });
    res
      .cookie("token", token, { httpOnly: true, secure: true })
      .json({ message: "Login successful", token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = loginController;
