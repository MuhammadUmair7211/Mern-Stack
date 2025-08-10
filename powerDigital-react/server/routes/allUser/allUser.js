const express = require("express");
const User = require("../../models/User");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
	const user = await User.findById(req.userId);
	if (!user) return res.status(404).json({ message: "User not Found" });
	res.status(200).json({ user });
});

router.get("/", async (req, res) => {
	try {
		const allUsers = await User.find({ role: "user" });
		res.json(allUsers);
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	console.log(req.body);
	const { credit, profit, deposit } = req.body;
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		let updatedFields = [];
		if (user.credit !== Number(credit)) {
			updatedFields.push("credit");
		}
		if (user.profit !== Number(profit)) {
			updatedFields.push("profit");
		}
		if (user.deposit !== Number(deposit)) {
			updatedFields.push("deposit");
		}
		let message;
		if (updatedFields.length > 0) {
			message = `${user.username}'s ${updatedFields.join(
				" , "
			)} updated successfully!`;
		} else {
			message = "No changes detected";
		}
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				credit: Number(credit),
				profit: Number(profit),
				deposit: Number(deposit),
			},
			{ new: true }
		);

		return res.status(200).json({
			success: true,
			message: message,
			user: updatedUser,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Update failed",
			error: error.message,
		});
	}
});

router.put("/:id/reset-balances", async (req, res) => {
	const { id } = req.params;
	try {
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ credit: 0, deposit: 0, profit: 0 },
			{ new: true }
		);
		res.json(updatedUser);
	} catch (err) {
		res.status(500).json({ message: "Balance reset failed" });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		if (!deletedUser) {
			return res.status(404).json({ message: "user not found" });
		}
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
});

module.exports = router;
