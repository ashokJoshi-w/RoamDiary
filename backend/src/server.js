require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const upload = require('./multer');
const fs = require('fs');
const path = require('path');
const { authenticateToken } = require('./utilities');

const User = require('./models/user.model');
const TravelStory = require('./models/travelStory.model');

const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Create folder if it does not exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Authentication Routes

app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ message: "All fields required" });

    try {
        const isUser = await User.findOne({ email: email.toLowerCase() });
        if (isUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ fullName, email: email.toLowerCase(), password: hashedPassword });
        await user.save();

        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '72h' });
        return res.status(201).json({ error: false, user: { fullName: user.fullName, email: user.email }, accessToken, message: "Registration successful" });
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ error: true, message: "Internal server error during registration" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '72h' });
        return res.json({ error: false, message: "Login successful", user: { fullName: user.fullName, email: user.email }, accessToken });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ error: true, message: "Internal server error during login" });
    }
});

app.get("/get-user", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) return res.sendStatus(401);
        return res.json({ error: false, user });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Server error" });
    }
});