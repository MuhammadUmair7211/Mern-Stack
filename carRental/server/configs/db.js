import mongoose from "mongoose";
export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDb Connected");
	} catch (error) {
		console.log(error.message);
	}
};
