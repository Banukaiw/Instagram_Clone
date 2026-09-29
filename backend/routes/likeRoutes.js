const express = require("express");
const Like = require("../models/Like");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const like = new Like(req.body);

        await like.save();

        res.json(like);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const likes = await Like.find();

        res.json(likes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        await Like.findByIdAndDelete(req.params.id);

        res.json({ message: "Like deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;