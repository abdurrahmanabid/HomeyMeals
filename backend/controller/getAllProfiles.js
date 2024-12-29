const Profile = require("../model/Profile"); // Import the Profile model

// Controller to get all profiles
const getAllProfiles = async (req, res) => {
  try {
    // Fetch all profiles, populating the associated User data if needed
    const profiles = await Profile.find().populate("userId",); // Assuming User model has name and email fields

    // Return the profiles
    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (err) {
    console.error("Error fetching profiles:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profiles.",
      error: err.message,
    });
  }
};

module.exports = {
  getAllProfiles,
};
