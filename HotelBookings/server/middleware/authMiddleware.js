import User from "../models/User.js";
import { clerkClient } from "@clerk/clerk-sdk-node";
export const protect = async (req, res, next) => {
	const { userId } = req.auth();
	if (!userId) {
		return res.status(401).json({ success: false, message: "Not authorized" });
	}

	let user = await User.findOne({ clerkId: userId });

	if (!user) {
		const clerkUser = await clerkClient.users.getUser(userId);

		user = await User.create({
			clerkId: userId,
			username: clerkUser.username || clerkUser.id,
			email: clerkUser.emailAddresses[0].emailAddress,
			image: clerkUser.imageUrl,
			role: "user",
			recentSearchCities: [],
		});
	}

	req.user = user;
	next();
};
