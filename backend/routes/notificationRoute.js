const express = require("express");
const router = express.Router();
const {
  createNotification,
  getAllNotifications,
  updateNotification,
  deleteNotification,
  getNotificationsByUserId,
} = require("../controller/notificationController");

// 📌 POST - Create a new notification
router.post("/add-notification", createNotification);

// 📌 GET - Get all notifications
router.get("/get-all", getAllNotifications);

// 📌 PUT - Update a notification by ID
router.put("/update/:id", updateNotification);

// 📌 DELETE - Delete a notification by ID
router.delete("/delete/:id", deleteNotification);
router.get("/get/:userId", getNotificationsByUserId);

module.exports = router;
