import express from "express";
import {
	getAllUsers,
	loginUser,
	registerUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const authRouter = express.Router();
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/allUsers", getAllUsers);
authRouter.get("/me", protect, (req, res) => {
	res.status(200).json({ user: req.user });
});
export default authRouter;
