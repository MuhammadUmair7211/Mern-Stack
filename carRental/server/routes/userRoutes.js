import express from "express";
import {
	registerUser,
	loginUser,
	generateUserData,
} from "../controllers/userController.js";
import { protect } from "../controllers/auth.js";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, generateUserData);

export default userRouter;
