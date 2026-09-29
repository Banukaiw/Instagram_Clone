const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

    postId: String,

    userId: String,

    username: String,

    text: String,
    
    profileImage: String,

    timestamp: {
        type: Date,
        default: Date.now
    }

});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;