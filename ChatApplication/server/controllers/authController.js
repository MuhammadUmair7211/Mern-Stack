import bcrypt from "bcrypt";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "Email already registered" });
		}
		if (!username || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});
		await newUser.save();
		res
			.status(201)
			.json({ user: newUser, message: "User registered successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Server error" });
	}
};

export const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: "user not available" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "invalid password" });
		}
		const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});
		return res.status(200).json({ message: "Login Successful", token });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

// all users

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		if (!users) {
			return res.status(400).json({ message: "users not available" });
		}
		return res.status(200).json({ users });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};
