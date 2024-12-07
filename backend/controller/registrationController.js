const User = require('../model/RegistrationModel'); 
const bcrypt = require('bcrypt');

// Register a new user
const registrationController =async (req, res) => {
  try {
    const { fullName, email, password, phone, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    const user = new User({ fullName, email, password, phone, role });
   const savedUser=  await user.save();

    const token = generateToken({ id: user._id, role: user.role });
    res
      .cookie("token", token, { httpOnly: true, secure: true })
      .status(201)
      .json({ message: "User registered successfully", token ,
        user: {
            id: savedUser._id,
            fullName: savedUser.fullName,
            email: savedUser.email,
            role: savedUser.role,
          },
       });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = registrationController;
