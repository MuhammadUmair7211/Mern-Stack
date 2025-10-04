import User from "../models/User.js";

export const registerUserController = async (req, res) => {
	try {
		const { username, email, image } = req.body;
		if (!username || !email || !image) {
			return res.json({ message: "Incomplete details" });
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(409)
				.json({ success: false, message: "User already exists" });
		}
		const newUser = new User({
			username,
			email,
			image,
		});
		await newUser.save();
		return res.status(201).json({
			success: true,
			message:
				"You have successfully registered on KhairKhabar.com. Now you can Like posts",
			user: newUser,
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find();
		if (!allUsers) {
			return res.json({ success: false, message: "No Users found" });
		}
		return res.status(200).json({ success: true, registeredUsers: allUsers });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error" });
	}
};
