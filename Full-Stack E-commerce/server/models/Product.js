import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
			trim: true,
		},
		category: {
			type: String,
			required: true,
			trim: true,
		},
		subCategory: {
			type: String,
		},
		description: {
			type: String,
			required: true,
		},
		bestseller: {
			type: Boolean,
			default: false,
		},
		images: {
			type: Array,
			required: true,
		},
		sizes: {
			type: Array,
			required: true,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
