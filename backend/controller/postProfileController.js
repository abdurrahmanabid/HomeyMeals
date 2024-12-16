const Profile = require("../model/Profile");
const User = require("../model/User");

const postProfileController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { division, district, upazilla, description, profilePicture } =
      req.body;

    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if a profile already exists for the user
    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res
        .status(400)
        .json({ error: "Profile already exists for this user" });
    }

    // Check if profilePicture is provided in base64 format
    if (!profilePicture) {
      return res.status(400).json({ error: "Profile picture is required" });
    }

    // Create a new profile
    const newProfile = new Profile({
      userId,
      upazilla: upazilla || "",
      district: district || "",
      division: division || "",
      description: description || "",
      profilePicture, // Save the base64 string directly
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
