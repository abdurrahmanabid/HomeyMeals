const User = require("../model/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");
const nodemailer = require("nodemailer");

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

    // Configure Nodemailer transporter
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
     const info = transporter.sendMail({
        from: 'homey-meals', // sender address
        to: user.email, // list of receivers
        subject: "Email Verification link", // Subject line
        html: `<body style="font-family:Arial,sans-serif;margin:0;padding:0;background-color:#e3f2fd">
  <div style="max-width:600px;margin:50px auto 50px;background-color:#fff;padding:20px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.1)">
    <div style="text-align:center;padding-bottom:20px;border-bottom:1px solid #e0e0e0;background-color:#1565c0;color:#fff">
      <h1 style="margin:0;padding-top:10px">Email Verification</h1>
    </div>
    <div style="padding:20px;text-align:center">
      <p style="font-size:16px;color:#666">Hi ${user.fullName},</p>
      <p style="font-size:16px;color:#666">
        Thank you for signing up for HomeyMeals as ${user.role}. Please verify your email address by clicking the button below:
      </p>
      <a href="http://localhost:8000/api/auth/${user.email}" style="display:inline-block;margin-top:20px;padding:12px 25px;background-color:#2aa00d;color:#fff;text-decoration:none;border-radius:5px;font-size:16px">
        Verify Email
      </a>
      <p style="font-size:16px;color:#666">
        If you did not create an account with us, please ignore this email.
      </p>
    </div>
    <div style="text-align:center;padding-top:20px;border-top:1px solid #e0e0e0;font-size:12px;color:#999">
      <p>© 2020 HomeyMeals. All rights reserved.</p>
    </div>
  </div>
</body>

`, // html body
      });

    // Generate token
    const token = generateToken({
      id: savedUser._id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      role: savedUser.role,
      createDate: savedUser.createDate,
      phone: savedUser.phone,
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
          createDate: savedUser.createDate,
        },
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = registrationController;
