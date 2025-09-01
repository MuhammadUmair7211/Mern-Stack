import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import messageRouter from "./routes/messageRouter.js";
import profileRouter from "./routes/profileRouter.js";
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/profile", profileRouter);
app.get("/", (req, res) => {
	res.send(`server is running, ${PORT}`);
});

app.listen(PORT, () => {
	console.log(`server is running, ${PORT}`);
});
