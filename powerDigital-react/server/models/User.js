const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		credit: {
			type: Number,
			default: 0.0,
		},
		profit: {
			type: Number,
			default: 0.0,
		},
		deposit: {
			type: Number,
			default: 0.0,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
