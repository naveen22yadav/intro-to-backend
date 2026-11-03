import { User } from "../models/user.model.js";

// Register user
const registerUser = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        const resolvedUsername = username || name;

        // Basic validation
        if (!resolvedUsername || !email || !password) {
            return res.status(400).json({ message: "All fields are important!" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [
                { email: email.trim().toLowerCase() },
                { username: resolvedUsername.trim().toLowerCase() }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Create new user
        const user = await User.create({
            username: resolvedUsername.trim().toLowerCase(),
            email: email.trim().toLowerCase(),
            password
        });

        return res.status(201).json({
            message: "User registered!",
            user: {
                id: user._id,
                _id: user._id,
                email: user.email,
                username: user.username,
                name: user.username
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({
            message: "User Logged in",
            user: {
                id: user._id,
                _id: user._id,
                email: user.email,
                username: user.username,
                name: user.username
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Logout user
const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        if (email) {
            const user = await User.findOne({ email: email.trim().toLowerCase() });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
        }

        return res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export {
    registerUser,
    loginUser,
    logoutUser,
    logoutUser as logoutuser
};
