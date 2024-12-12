const Profile = require("../model/Profile");

// Create a new profile
exports.createProfile = async (req, res) => {
  const { userId, location, description, profilePicture } = req.body;
  try {
    const profile = await Profile.create({ userId, location, description, profilePicture });
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a profile by userId
exports.getProfileByUserId = async (req, res) => {
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
