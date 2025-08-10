const mongoose = require("mongoose");
const tradeSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		pair: {
			type: String,
			required: true,
		},
		expiryTime: {
			type: Number,
			required: true,
		},
		yield: {
			type: Number,
			required: true,
		},
		investmentAmount: {
			type: Number,
			required: true,
		},
		tradeDirection: {
			type: String,
			enum: ["Buy Up", "Buy Down"],
			required: true,
		},
		lockedPrice: {
			type: mongoose.Schema.Types.Decimal128,
			required: true,
		},

		result: {
			type: String,
			enum: ["profit", "loss", "pending"],
			default: "pending",
		},
		status: {
			type: String,
			enum: ["open", "closed"],
			default: "open",
		},
		profit: {
			type: Number,
		},
		loss: {
			type: Number,
		},
		credit: {
			type: Number,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Trade", tradeSchema);
