const express = require("express");
const router = express.Router();
const multer = require("multer");
const Deposit = require("../../models/Deposit");
const authMiddleware = require("../../middleware/authMiddleware");

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "uploads/"),
	filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post(
	"/deposit",
	authMiddleware,
	upload.single("proof"),
	async (req, res) => {
		const { amount, currency } = req.body;
		try {
			const userId = req.userId;
			const newDeposit = await new Deposit({
				user: userId,
				amount,
				currency,
				proof: req.file.filename,
				status: "pending",
			});
			await newDeposit.save();
			res.status(201).json({ message: "Deposit successful", newDeposit });
		} catch (error) {
			console.error("Deposit Error:", error);
			res.status(500).json({ error: "Failed to submit deposit" });
		}
	}
);

router.delete("/:id", async (req, res) => {
	try {
		const deletedDeposit = await Deposit.findByIdAndDelete(req.params.id);
		if (!deletedDeposit) {
			return res.status(404).json({ message: "Deposit not found" });
		}
		res.status(200).json({ message: "Deposit deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
});

router.patch("/toggle/:id", async (req, res) => {
	try {
		const deposit = await Deposit.findById(req.params.id);
		if (!deposit) {
			return res.status(404).json({ message: "Deposit not found" });
		}
		deposit.status = deposit.status === "pending" ? "approved" : "pending";
		await deposit.save();
		res.status(200).json({ message: "Status toggled", status: deposit.status });
	} catch (error) {
		console.error("Toggle Error:", error);
		res.status(500).json({ message: "Server error" });
	}
});

// GET /api/userDeposit
router.get("/user-deposit", authMiddleware, async (req, res) => {
	try {
		const deposits = await Deposit.find({ user: req.userId }).populate(
			"user",
			"username email"
		); // Include basic user details

		res.status(200).json(deposits);
	} catch (err) {
		console.error("Error fetching user deposits:", err);
		res.status(500).json({ error: "Failed to fetch deposits" });
	}
});

router.get("/admin", authMiddleware, async (req, res) => {
	try {
		const deposits = await Deposit.find()
			.sort({
				createdAt: -1,
			})
			.populate("user", "username email");
		res.status(200).json(deposits);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch deposits" });
	}
});

module.exports = router;
