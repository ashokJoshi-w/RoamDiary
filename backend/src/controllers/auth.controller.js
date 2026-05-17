import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const registeruser = async (req, res) => {
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
};