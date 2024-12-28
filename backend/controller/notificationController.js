const Notification = require("../model/notification");

// ✅ Create a new notification (POST)
const createNotification = async (req, res) => {
  try {
    const { userId, title, message, isRead } = req.body;

    // Validate required fields
    if (!userId || !title || !message) {
      return res
        .status(400)
        .json({ error: "userId, title, and message are required" });
    }

    const newNotification = new Notification({
      userId,
      title,
      message,
      isRead,
    });

    await newNotification.save();

    return res.status(201).json({
      message: "Notification created successfully",
      notification: newNotification,
    });
  } catch (error) {
    console.error("Create Notification Error:", error);
    return res.status(500).json({ error: "Failed to create notification" });
  }
};

// ✅ Get all notifications (GET)
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate(
      "userId",
      "fullName email"
    ); // Populates user details

    return res.status(200).json({ notifications });
  } catch (error) {
    console.error("Get All Notifications Error:", error);
    return res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

// ✅ Get a single notification by ID (GET)
const getNotificationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if userId is provided
    if (!userId) {
      return res.status(400).json({ error: "userId parameter is required" });
    }

    // Fetch notifications by userId
    const notifications = await Notification.find({ userId }).populate(
      "userId",
      "fullName email"
    );

    if (!notifications || notifications.length === 0) {
      return res
        .status(404)
        .json({ error: "No notifications found for this user" });
    }

    return res.status(200).json({ notifications });
  } catch (error) {
    console.error("Get Notifications by UserId Error:", error);
    return res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

// ✅ Update a notification by ID (PUT)
const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message, isRead } = req.body;

    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { title, message, isRead },
      { new: true, runValidators: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    return res.status(200).json({
      message: "Notification updated successfully",
      notification: updatedNotification,
    });
  } catch (error) {
    console.error("Update Notification Error:", error);
    return res.status(500).json({ error: "Failed to update notification" });
  }
};

// ✅ Delete a notification by ID (DELETE)
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    return res
      .status(200)
      .json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Delete Notification Error:", error);
    return res.status(500).json({ error: "Failed to delete notification" });
  }
};

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationsByUserId,
  updateNotification,
  deleteNotification,
};
