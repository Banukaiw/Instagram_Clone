const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    user: {
        id: String,
        username: String,
        profile_pic: String
    },

    image: String,

    caption: String,

    likes: {
        type: Number,
        default: 0
    },

    comments: {
        type: Array,
        default: []
    },

    timestamp: {
        type: Date,
        default: Date.now
    }

});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;