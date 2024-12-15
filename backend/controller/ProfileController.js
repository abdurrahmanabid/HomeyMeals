const Profile = require("../model/Profile");
const User = require("../model/User");

// Create a new profile

const createProfileController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { location, description } = req.body;

    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if a profile already exists for the user
    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ error: "Profile already exists for this user" });
    }

    // Ensure a profile picture was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Profile picture is required" });
    }

    // Create a new profile
    const newProfile = new Profile({
      userId,
      location: {
        upazilla: location?.upazilla || "",
        district: location?.district || "",
        division: location?.division || "",
      },
      description: description || "",
      profilePicture: req.file.path, // Assuming you're saving the path of the uploaded image
    });

    // Save the profile
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

module.exports = createProfileController;


// Get a profile by userId
module.exports.getProfileByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await Profile.findOne({ userId }).populate("userId");
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a profile
exports.updateProfile = async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;
  try {
    const profile = await Profile.findOneAndUpdate({ userId }, updates, { new: true });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a profile
exports.deleteProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await Profile.findOneAndDelete({ userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
