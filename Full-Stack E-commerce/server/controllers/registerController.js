import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
	try {
		const { firstName, lastName, emailAddress, password } = req.body;
		const emailExist = await User.findOne({ emailAddress });
		if (emailExist) {
			return res.json({
				success: false,
				message: "Email is already registered",
			});
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			firstName,
			lastName,
			emailAddress,
			password: hashedPassword,
		});
		await newUser.save();

		return res.json({
			success: true,
			message: "User registered successfully",
			user: {
				_id: newUser._id,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				emailAddress: newUser.emailAddress,
			},
		});
	} catch (error) {
		console.log(error);
		return res.json({ success: false, message: "internal server error" });
	}
};

export const loginController = async (req, res) => {
	try {
		const { emailAddress, password } = req.body;
		const user = await User.findOne({ emailAddress });
		if (!user) {
			return res.json({ success: false, message: "Email not registered" });
		}
		const matchPassword = await bcrypt.compare(password, user.password);
		if (!matchPassword) {
			return res.json({ success: false, message: "Invalid password" });
		}
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
		return res.json({
			success: true,
			message: "Login successful",
			token,
			user: {
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				emailAddress: user.emailAddress,
			},
		});
	} catch (error) {
		console.log(error);
		return res.json({ success: false, message: "internal server error" });
	}
};
