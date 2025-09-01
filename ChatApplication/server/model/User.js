import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		image: {
			type: String,
			default:
				"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
		},
		bio: { type: String, default: "Hey there! I am using ChatApp" },
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
