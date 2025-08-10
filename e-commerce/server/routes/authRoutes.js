const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// register/signup route
router.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.json({ success: false, message: "Email already registered" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ name, email, password: hashedPassword });
		await newUser.save();
		res.json({ success: true, message: "User registered successfully" });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error });
	}
});

// login route

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const storedUser = await User.findOne({ email });
		if (!storedUser) {
			res.json({ success: false, message: "User not Found" });
		}
		const iSMatch = await bcrypt.compare(password, storedUser.password);
		if (!iSMatch) {
			res.json({ success: false, message: "Invalid Password" });
		}
		res.json({
			success: true,
			message: "Login Successful",
			user: {
				name: storedUser.name,
				email: storedUser.email,
			},
		});
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error });
	}
});

module.exports = router;
