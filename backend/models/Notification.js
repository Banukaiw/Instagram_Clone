const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  profileImage: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Notification", notificationSchema);