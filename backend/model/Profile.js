const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Foreign Key
  location: {
    upazilla: { type: String },
    district: { type: String },
    division: { type: String },
  },
  description: { type: String },
  profilePicture: { type: String },
});

// Ensure a Profile is created for only one user
profileSchema.index({ userId: 1 }, { unique: true });

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
