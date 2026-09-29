const express = require("express");
const SearchImage = require("../models/SearchImage");

const router = express.Router();

// Get all search images
router.get("/", async (req, res) => {
    try {
        const images = await SearchImage.find();

        res.json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create search image
router.post("/", async (req, res) => {
    try {
        const image = new SearchImage(req.body);

        await image.save();

        res.json(image);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;