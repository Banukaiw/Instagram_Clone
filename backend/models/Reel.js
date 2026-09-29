const mongoose = require("mongoose");

const reelSchema = new mongoose.Schema({
    username: String,
    profileImage: String,
    video: String,
    caption: String,
    likes: Number,
    comments: Number
});

module.exports = mongoose.model("Reel", reelSchema);