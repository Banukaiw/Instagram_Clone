const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");

// Get all notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a notification
router.post("/", async (req, res) => {
  try {
    const notification = new Notification(req.body);

    const savedNotification = await notification.save();

    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;