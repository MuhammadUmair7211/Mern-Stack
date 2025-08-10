const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const router = express.Router();

// ADMIN REGISTER ROUTE

router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email, role: "admin" });
		if (existingUser) {
			return res.json({ message: "Admin is already registered" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			role: "admin",
		});
		await newUser.save();

		const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
		return res.status(201).json({
			message: `Admin account for ${username} has been successfully created. You can now access the admin dashboard.`,
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

// ADMIN LOGIN ROUTE

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.json({ message: "Admin not found" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.json({ message: "Invalid password" });
		}
		if (user.role !== "admin") {
			return res.json({ message: "Not authorised. Admins only." });
		}
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
		return res.status(200).json({
			message: `Welcome back, ${user.username}. You are now logged in with administrative privileges.`,
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
