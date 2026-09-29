const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({

    postId: String,

    userId: String

});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;