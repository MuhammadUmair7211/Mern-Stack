const mongoose = require("mongoose");
const depositSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		amount: { type: Number },
		currency: { type: String },
		proof: { type: String },
		status: { type: String, enum: ["pending", "approved"], default: "pending" },
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Deposit", depositSchema);
