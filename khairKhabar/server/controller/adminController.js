import jwt from "jsonwebtoken";
export const adminController = async (req, res) => {
	try {
		const ADMIN_EMAIL = process.env.ADMIN_LOGIN_EMAIL;
		const ADMIN_PASSWORD = process.env.ADMIN_LOGIN_PASSWORD;
		const { email, password } = req.body;
		if (!email || !password) {
			return res.json({
				success: false,
				message: "Email and Password are required!",
			});
		}

		if (email !== ADMIN_EMAIL) {
			return res.json({ message: "Invalid Email!" });
		}
		if (password !== ADMIN_PASSWORD) {
			return res.json({ message: "Invalid Login Password!" });
		}

		const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		return res.status(200).json({
			success: true,
			message: "You have successfully Logged in!",
			token,
		});
	} catch (error) {
		console.error(err);
		return res.status(500).json({ error: "server error" });
	}
};
