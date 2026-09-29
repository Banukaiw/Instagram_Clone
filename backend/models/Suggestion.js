const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
    userId: String,
    username: String,
    profileImage: String
});

module.exports = mongoose.model("Suggestion", suggestionSchema);