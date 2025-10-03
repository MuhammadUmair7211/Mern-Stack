import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import postRouter from "./routes/postRoutes.js";
import authRouter from "./routes/authRoutes.js";

// Load .env variables
dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/post", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", authRouter);
app.get("/", (req, res) => {
	res.send("🚀 Urdu Blog Backend is Running!");
});

// Use PORT from .env if available
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`✅ Server is running on port ${PORT}`);
});
