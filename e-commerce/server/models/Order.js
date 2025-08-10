const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
	customerName: String,
	customerEmail: String,
	customerAddress: String,
	customerNumber: Number,
	cartItems: [
		{
			title: String,
			quantity: Number,
		},
	],
	totalAmount: Number,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
module.exports = mongoose.model("Order", orderSchema);
