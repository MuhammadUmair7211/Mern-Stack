const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
router.post("/", async (req, res) => {
	try {
		console.log("📦 Received Order Body:", req.body); // log body
		const order = new Order(req.body);
		await order.save();
		res.json(order);
	} catch (error) {
		console.error("❌ Order POST error:", error.message); // log error
		res.status(400).json({ error: error.message });
	}
});
router.delete("/:id", async (req, res) => {
	try {
		const deletedOrder = await Order.findByIdAndDelete(req.params.id);
		if (!deletedOrder) {
			return res.json({ success: false, message: "Order not found" });
		}
		res.json({ success: true, message: "Order deleted successfully" });
	} catch (error) {
		console.error("❌ DELETE error:", error.message);
		res.status(500).json({ success: false, message: error.message });
	}
});

router.get("/", async (req, res) => {
	try {
		const orders = await Order.find();
		res.json(orders);
	} catch (error) {
		res.json({ err: error });
	}
});
module.exports = router;
