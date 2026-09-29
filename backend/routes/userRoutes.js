const express = require("express");
const User = require("../models/User");

const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const user = new User(req.body);

        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put("/:id", async (req, res) => {
    try {
        
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(user);

    } catch (error) {      

        res.status(500).json({
            message: error.message
        });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search users
router.get("/search", async (req, res) => {
    try {
        const searchText = req.query.q;

        const users = await User.find({
            $or: [
                { username: { $regex: searchText, $options: "i" } },
                { name: { $regex: searchText, $options: "i" } }
            ]
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get one user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;