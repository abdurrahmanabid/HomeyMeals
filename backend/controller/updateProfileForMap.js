const Profile = require("../model/Profile");

const updateProfileForMap = async (req, res) => {
  try {
    const { userId } = req.params;
    const { lat, lng } = req.body;

    // Check if the profile exists
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Update the lat and lng fields
    if (lat !== undefined) profile.lat = lat;
    if (lng !== undefined) profile.lng = lng;

    await profile.save();

    res.status(200).json({
      message: "Profile updated successfully!",
      profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the profile" });
  }
};

module.exports = updateProfileForMap;
