const express = require("express");
const router = express.Router();

const Reel = require("../models/Reel");

// Get all reels
router.get("/", async (req, res) => {
    try {
        const reels = await Reel.find();

        res.json(reels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a reel
router.post("/", async (req, res) => {
    try {
        const reel = new Reel(req.body);

        await reel.save();

        res.json(reel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a reel
router.delete("/:id", async (req, res) => {
    try {
        await Reel.findByIdAndDelete(req.params.id);

        res.json({ message: "Reel deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;