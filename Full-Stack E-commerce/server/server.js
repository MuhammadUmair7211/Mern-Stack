import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import authRouter from "./Routes/authRoutes.js";
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
	res.send("Hello, Server is running!");
});
app.listen(PORT, () => {
	console.log(`server is running on port, ${PORT}`);
});
