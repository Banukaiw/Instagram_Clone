const mongoose = require("mongoose");

const searchImageSchema = new mongoose.Schema({
    image: String
});

const SearchImage = mongoose.model("SearchImage", searchImageSchema);

module.exports = SearchImage;