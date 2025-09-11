import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const adminController = async (req, res) => {
	try {
		const { adminEmail, adminPassword } = req.body;

		if (!adminEmail || !adminPassword) {
			return res.json({
				success: false,
				message: "Admin Email & Admin Password are required",
			});
		}

		if (adminEmail !== process.env.ADMIN_LOGIN_EMAIL) {
			return res.json({ success: false, message: "Invalid Email" });
		}

		if (process.env.ADMIN_LOGIN_PASSWORD !== adminPassword) {
			return res.json({ success: false, message: "Invalid password" });
		}

		const token = jwt.sign(
			{ email: adminEmail, role: "admin" }, // payload
			process.env.JWT_SECRET, // secret from .env
			{ expiresIn: "1h" } // token expiry
		);

		return res.json({
			success: true,
			message: "Admin logged in successfully",
			token,
			admin: adminEmail,
		});
	} catch (error) {
		console.error(error);
		return res.json({ success: false, message: "Internal server error" });
	}
};
