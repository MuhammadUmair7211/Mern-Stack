const express = require("express");
const multer = require("multer");
const Product = require("../models/Products");

const router = express.Router();

// Multer config for image storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "uploads/"),
	filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Add product
router.post("/add", upload.single("image"), async (req, res) => {
	try {
		const {
			title,
			description,
			price,
			rating,
			brand,
			stock,
			returnPolicy,
			warranty,
		} = req.body;
		const image = req.file.filename;

		const newProduct = new Product({
			title,
			image,
			price,
			rating,
			description,
			brand,
			stock,
			returnPolicy,
			warranty,
		});
		await newProduct.save();
		res.json(newProduct);
	} catch (err) {
		console.log(err);

		res.status(500).json({ error: "Failed to add product" });
	}
});
// remove a product
router.delete("/:id", async (req, res) => {
	try {
		const deleteProduct = await Product.findByIdAndDelete(req.params.id);
		if (!deleteProduct) {
			return res.json({ success: false, message: "Product not found" });
		}
		return res.json({ success: true, message: "Product deleted successfully" });
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
});

// Get all products
router.get("/", async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch products" });
	}
});

module.exports = router;
