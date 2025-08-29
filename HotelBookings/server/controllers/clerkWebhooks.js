import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
	try {
		const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
		const headers = {
			"svix-id": req.headers["svix-id"],
			"svix-timestamp": req.headers["svix-timestamp"],
			"svix-signature": req.headers["svix-signature"],
		};
		await whook.verify(JSON.stringify(req.body), headers);
		const { data, type } = req.body;
		const userData = {
			email: data.email_adresses[0].email_adress,
			username: data.first_name + " " + data.last_name,
			image: data.image_url,
		};

		switch (type) {
			case "userData.created":
				{
					await User.create(userData);
				}
				break;
			case "userData.updated":
				{
					await User.findByIdAndUpdate(data.id, userData);
				}
				break;
			case "userData.deleted":
				{
					await User.findByIdAndDelete(data.id);
				}
				break;

			default:
				break;
		}
		res.json({ success: true, message: "Webhook Received" });
	} catch (error) {
		console.log(error.message);
		res.json({ success: false, message: error.message });
	}
};
export default clerkWebHooks;
