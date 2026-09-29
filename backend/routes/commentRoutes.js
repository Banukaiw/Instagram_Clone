const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const comment = new Comment(req.body);

        await comment.save();

        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find();

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);

        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;