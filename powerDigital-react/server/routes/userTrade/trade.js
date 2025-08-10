const express = require("express");
const router = express.Router();
const Trade = require("../../models/Trade.js");
const authMiddleware = require("../../middleware/authMiddleware");
const mongoose = require("mongoose");
const User = require("../../models/User.js");
router.post("/", authMiddleware, async (req, res) => {
	const {
		pair,
		expiryTime,
		yield,
		investmentAmount,
		tradeDirection,
		lockedPrice,
	} = req.body;
	try {
		const userId = req.userId;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// ✅ Calculate total balance
		const totalBalance = user.profit + user.deposit + user.credit;

		// ✅ Check if user has enough balance
		if (totalBalance < investmentAmount) {
			return res.status(400).json({ message: "Insufficient balance" });
		}
		let remainingAmount = investmentAmount;

		if (user.profit >= remainingAmount) {
			user.profit -= remainingAmount;
		} else {
			remainingAmount -= user.profit;
			user.profit = 0;

			if (user.deposit >= remainingAmount) {
				user.deposit -= remainingAmount;
			} else {
				remainingAmount -= user.deposit;
				user.deposit = 0;

				user.credit -= remainingAmount;
			}
		}
		await user.save();

		const tradeData = await new Trade({
			user: userId,
			pair,
			expiryTime,
			yield,
			investmentAmount,
			tradeDirection,
			lockedPrice,
		});

		await tradeData.save();
		const savedTrade = await Trade.findById(tradeData._id).populate("user");

		const formattedTrade = {
			...savedTrade.toObject(),
			lockedPrice: savedTrade.lockedPrice.toString(),
		};
		res
			.status(201)
			.json({ message: "Trade successful", savedTrade: formattedTrade });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: "Internal Server Error", error: error.message });
	}
});

router.get("/trade-result", authMiddleware, async (req, res) => {
	const symbol = req.query.symbol;
	try {
		const user = await User.findById(req.userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const lastTrade = await Trade.findOne({ user: req.userId }).sort({
			createdAt: -1,
		});

		if (!lastTrade) {
			return res
				.status(404)
				.json({ success: false, message: "No trade found" });
		}

		const response = await fetch(
			`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
		);
		if (!response.ok) {
			const errorData = await response.json();
			console.error("Binance API Error:", errorData);
			return res.status(400).json({ success: false, error: errorData });
		}

		const data = await response.json();

		const currentPrice = data.price;
		const lastLockedPrice = lastTrade.lockedPrice;
		const direction = lastTrade.tradeDirection;
		const yieldPercent = lastTrade.yield;
		const amount = lastTrade.investmentAmount;

		let isProfit = false;

		if (direction === "Buy Up") {
			isProfit = currentPrice > lastLockedPrice;
		} else if (direction === "Buy Down") {
			isProfit = currentPrice < lastLockedPrice;
		}

		let result;
		let profit;
		let loss;
		if (isProfit) {
			// Calculate profit properly
			const calculatedProfit = (amount * yieldPercent) / 100;
			profit = calculatedProfit;

			result = "profit";
			user.profit += calculatedProfit;
			user.credit += amount;
			lastTrade.profit = calculatedProfit;
		} else {
			result = "loss";
			loss = amount;
			lastTrade.loss = amount;
		}

		// Update trade
		lastTrade.result = result;

		// Save updates
		await lastTrade.save();
		await user.save();

		res.json({
			success: true,
			result,
			user,
			profit,
			loss,
			entry: lastLockedPrice,
			exit: currentPrice,
			symbol,
			tradeId: lastTrade._id,
		});
	} catch (error) {
		console.error("Error fetching price:", error);
		res.status(500).json({ success: false, error: "Internal server error" });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: "Invalid trade ID" });
		}

		const deletedTrade = await Trade.findByIdAndDelete(id);

		if (!deletedTrade) {
			return res.status(404).json({ message: "Trade not found" });
		}

		res.status(200).json({ message: "Trade deleted successfully" });
		Trade.status = "closed";
	} catch (error) {
		console.error(`Server error: ${error}`);
		res.status(500).json({ error: "Server error" });
	}
});

router.get("/admin-manage-trade", authMiddleware, async (req, res) => {
	try {
		const trades = await Trade.find().sort({ createdAt: -1 }).populate({
			path: "user",
			select: "-password", // 👈 Exclude password from user
		});

		res.status(200).json(trades);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch trades" });
	}
});

router.patch("/admin-mark-result/:id", authMiddleware, async (req, res) => {
	try {
		const { result } = req.body;
		console.log(result);

		const markTrade = await Trade.findById(req.params.id);
		if (!markTrade) return res.status(404).json({ message: "Trade not found" });

		const user = await User.findById(markTrade.user);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const amount = markTrade.investmentAmount;
		const yieldPercent = markTrade.yield;
		const calculatedProfit = (amount * yieldPercent) / 100;

		if (markTrade.result === "profit") {
			profit = calculatedProfit;
			user.profit -= calculatedProfit;
			user.credit -= amount;
		} else if (markTrade.result === "loss") {
			user.credit += amount;
		}

		if (result === "profit") {
			user.profit += calculatedProfit;
			markTrade.result = "profit";
			markTrade.profit = amount;
		} else {
			user.credit -= amount;
			markTrade.result = "loss";
			markTrade.loss = amount;
		}

		markTrade.status = "closed";
		await markTrade.save();
		await user.save();

		res.json({ message: "Trade updated successfully", trade: markTrade });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error", error });
	}
});
router.get("/user-trade-history", authMiddleware, async (req, res) => {
	try {
		const trades = await Trade.find({ user: req.userId })
			.sort({ createdAt: -1 })
			.populate({
				path: "user",
				select: "-password", // 👈 Exclude password from user
			});

		res.status(200).json(trades);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch trades" });
	}
});
module.exports = router;
