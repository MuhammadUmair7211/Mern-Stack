import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "../server/configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
const app = express();
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
connectDB();
app.get("/", (req, res) => {
	res.send("Server is Running");
});
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
