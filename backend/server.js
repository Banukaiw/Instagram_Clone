const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const likeRoutes = require("./routes/likeRoutes");
const commentRoutes = require("./routes/commentRoutes");
const storyRoutes = require("./routes/storyRoutes");
const suggestionRoutes = require("./routes/suggestionRoutes");
const reelRoutes = require("./routes/reelRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const userRoutes = require("./routes/userRoutes");
const searchImageRoutes = require("./routes/searchImageRoutes");
const User = require("./models/User");
const authRoutes = require("./routes/auth");


const Post = require("./models/Post");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/reels", reelRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/search-images", searchImageRoutes);
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected!");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

app.get("/", (req, res) => {
    res.send("Instagram Backend is running!");
});

app.post("/api/posts", async (req, res) => {
    try {
        const post = new Post(req.body);

        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/api/posts", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put("/api/posts/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete("/api/posts/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);

        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});