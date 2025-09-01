import Message from "../model/Message.js";

export const messageController = async (req, res) => {
	try {
		const { text, senderId, receiverId } = req.body;
		const newMessage = new Message({
			text,
			senderId,
			receiverId,
		});
		await newMessage.save();
		return res.status(201).json(newMessage);
	} catch (error) {
		res.status(500).json({ err: error.message });
	}
};

export const allMessages = async (req, res) => {
	try {
		const { sender_Id, receiver_Id } = req.params;
		if (!sender_Id || !receiver_Id) {
			return res.json({ message: "sender and receiver Id are required" });
		}
		const messages = await Message.find({
			$or: [
				{ senderId: sender_Id, receiverId: receiver_Id },
				{ senderId: receiver_Id, receiverId: sender_Id },
			],
		}).sort({ createdAt: 1 });
		return res.json({ success: true, messages });
	} catch (error) {
		console.log(error);
		res.json({ err: error.message });
	}
};
