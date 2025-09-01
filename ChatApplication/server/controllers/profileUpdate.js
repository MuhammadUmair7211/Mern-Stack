import cloudinary from "../config/cloudinary.js";
import User from "../model/User.js";

export const profileUpdate = async (req, res) => {
	try {
		const { username, bio } = req.body;
		const userId = req.params.id;
		if (!userId) {
			return res.json({ success: false, message: "user ID is missing" });
		}
		let image;
		if (req.file) {
			const result = await new Promise((resolve, reject) => {
				const stream = cloudinary.uploader.upload_stream(
					{
						folder: "profiles",
					},
					(error, result) => {
						if (error) reject(error);
						else resolve(result);
					}
				);
				stream.end(req.file.buffer);
			});
			image = result.secure_url;
		}
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				username,
				bio,
				...(image && { image: image }),
			},
			{ new: true }
		);
		return res.json({
			success: true,
			user: updatedUser,
			message: "Profile updated successfully",
		});
	} catch (error) {
		console.log(error);
		return res.json({ success: false, message: "failed to update profile" });
	}
};
