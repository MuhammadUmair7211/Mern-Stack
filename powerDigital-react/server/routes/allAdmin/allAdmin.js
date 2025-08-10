const express = require("express");
const User = require("../../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const admin = await User.find({ role: "admin" });
		res.json(admin);
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const deletedAdmin = await User.findByIdAndDelete(req.params.id);
		if (!deletedAdmin) {
			return res.status(404).json({ message: "Admin not found" });
		}
		res.status(200).json({ message: "Admin deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
});

module.exports = router;
