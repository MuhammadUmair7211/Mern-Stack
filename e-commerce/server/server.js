const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const app = express();
app.use(cors());
const PORT = 3000;
const productRoutes = require("./routes/ProductRoutes");
const orderRoutes = require("./routes/OrderRoutes");
app.use(express.json());
mongoose
	.connect("mongodb://localhost:27017/e-commerce", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log("MongoDB connection error:", err));
app.get("/", (req, res) => {
	res.send("server is running");
});

app.use("/api/products", productRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});
