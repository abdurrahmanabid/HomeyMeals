const User = require("../model/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user:  process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Step 1: Send reset password email
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    // Send email
    await transporter.sendMail({
      from: "homey-meals",
      to: user.email,
      subject: "Password Reset",
      html: `<p>Click the link to reset your password: <a href="${resetLink}">Reset Password</a></p>`,
    });

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
};

// Step 2: Reset the password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save(); 

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token", error });
  }
};


module.exports = { forgotPassword, resetPassword };
