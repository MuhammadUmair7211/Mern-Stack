import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
connectDB();
connectCloudinary();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());

app.use("/api/clerk", clerkWebHooks);
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);
app.get("/", (req, res) => {
	res.send(`Server is Running on port, ${PORT}`);
});
app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
