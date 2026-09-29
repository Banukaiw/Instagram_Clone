const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    userId: String,
    username: String,
    profileImage: String,
    image: String
});

module.exports = mongoose.model("Story", storySchema);