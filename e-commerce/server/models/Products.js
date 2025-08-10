const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
	title: String,
	image: String,
	price: Number,
	rating: String,
	description: String,
	brand: String,
	stock: Number,
	returnPolicy: String,
	warranty: String,
});
module.exports = mongoose.model("Product", productSchema);
