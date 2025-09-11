import Product from "../models/Product.js";

// Create product
export const productController = async (req, res) => {
	try {
		const {
			name,
			category,
			subCategory,
			price,
			sizes,
			bestseller,
			description,
		} = req.body;

		const imageUrls = req.files.map((file) => file.path);

		const newProduct = new Product({
			name,
			category,
			subCategory,
			price,
			sizes: Array.isArray(sizes) ? sizes : [sizes],
			bestseller,
			description,
			images: imageUrls,
		});

		await newProduct.save();

		return res.json({
			success: true,
			message: "Product uploaded successfully",
			product: newProduct,
		});
	} catch (error) {
		console.error("Upload error:", error);
		return res.status(500).json({
			success: false,
			message: "Server error while uploading product",
		});
	}
};

// Get all products
export const getProductsController = async (req, res) => {
	try {
		const products = await Product.find();
		if (!products || products.length === 0) {
			return res.json({ success: false, message: "No products found" });
		}
		return res.json({ success: true, allProducts: products });
	} catch (error) {
		console.error("Get products error:", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};

// Delete product
export const deleteProductController = async (req, res) => {
	try {
		const { id } = req.params; // ✅ fixed
		const deletedProduct = await Product.findByIdAndDelete(id);

		if (!deletedProduct) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}

		return res.json({
			success: true,
			message: "Product deleted successfully",
			product: deletedProduct,
		});
	} catch (error) {
		console.error("Delete product error:", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};
