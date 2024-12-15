const User = require("../model/User");
const Profile = require("../model/Profile");
const fs = require("fs");

const postProfileController = async (req, res) => {
  try {
    const { userId } = req.params;
    const {division,district,upazilla, description } = req.body;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ error: "Profile already exists for this user" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Profile picture is required" });
    }

    const profilePictureBase64 = req.file.buffer.toString("base64");

    const newProfile = new Profile({
      userId,
        upazilla:upazilla || "",
        district:district || "",
        division:division || "",

      description: description || "",
      profilePicture: profilePictureBase64, 
    });

    await newProfile.save();

    res.status(201).json({
      message: "Profile created successfully!",
      profile: newProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create the profile" });
  }
};

module.exports = postProfileController;
