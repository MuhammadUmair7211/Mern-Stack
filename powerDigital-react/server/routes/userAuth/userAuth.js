const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const router = express.Router();

// USER REGISTER ROUTE
router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "Email already registered" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ username, email, password: hashedPassword });
		await newUser.save();

		const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		return res.status(201).json({
			message: `Welcome, ${username}! Your account has been successfully created.`,
			token,
			user: {
				id: newUser._id,
				username: newUser.username,
				email: newUser.email,
				role: newUser.role,
			},
		});
	} catch (error) {
		console.error("Registration error:", error);
		return res.status(500).json({ message: "Server error" });
	}
});

// USER LOGIN ROUTE
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}
		if (user.role === "admin") {
			return res
				.status(403)
				.json({ message: "Admins are not allowed to log in here" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid Password" });
		}
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		return res.status(200).json({
			message: `Welcome back, ${user.username}! You have successfully logged in.`,
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({ message: "Server error" }); // Added status code
	}
});

module.exports = router;
