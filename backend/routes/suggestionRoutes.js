const express = require("express");
const Suggestion = require("../models/Suggestion");

const router = express.Router();

// Get all suggestions
router.get("/", async (req, res) => {
    try {
        const suggestions = await Suggestion.find();
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;