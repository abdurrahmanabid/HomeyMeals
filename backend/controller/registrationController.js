const User = require("../model/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

// Register a new user
const registrationController = async (req, res) => {
  try {
    const { fullName, email, password, phone, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists" });

    // Create new user with automatic createDate
    const user = new User({ fullName, email, password, phone, role });
    const savedUser = await user.save();

    // Generate token
    const token = generateToken({
      id: savedUser._id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      role: savedUser.role,
      createDate: savedUser.createDate,
    });

    res
      .cookie("token", token, { httpOnly: true, secure: true })
      .status(201)
      .json({
        message: "User registered successfully",
        token,
        user: {
          id: savedUser._id,
          fullName: savedUser.fullName,
          email: savedUser.email,
          role: savedUser.role,
          createDate: savedUser.createDate, // You can return createDate here
        },
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = registrationController;
