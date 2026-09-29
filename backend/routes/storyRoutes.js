const express = require("express");
const Story = require("../models/Story");

const router = express.Router();

// Get all stories
router.get("/", async (req, res) => {
    try {
        const stories = await Story.find();
        res.json(stories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;