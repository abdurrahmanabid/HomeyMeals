const User = require("../model/User");
const Profile = require("../model/Profile");

const getProfileController = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch the profile for the given user
    const userProfile = await Profile.findOne({ userId }).populate("userId"); // Adjust fields as needed
    if (!userProfile) {
      return res.status(404).json({ error: "Profile not found for this user" });
    }

    // Prepend the base64 image with the appropriate data URL format
    const profilePicture = userProfile.profilePicture
      ? `data:image/jpeg;base64,${userProfile.profilePicture}`
      : null; // Replace `jpeg` with the actual image type if different

    res.status(200).json({
      message: "Profile retrieved successfully!",
      profile: {
        ...userProfile._doc, // Spread to include other profile fields
        profilePicture, // Add the formatted profile picture
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve the profile" });
  }
};

module.exports = getProfileController;
