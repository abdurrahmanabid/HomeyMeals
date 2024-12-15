const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  upazilla: { type: String, required: true },
  district: { type: String, required: true },
  division: { type: String, required: true },
  description: { type: String, required: true },
  profilePicture: { type: String, required: true },
  lat: { type: Number }, // Latitude
  lng: { type: Number }, // Longitude
});

// Ensure a Profile is created for only one user
profileSchema.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model("Profile", profileSchema);
