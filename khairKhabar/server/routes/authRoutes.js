import express from "express";
import {
	authController,
	getAllUsers,
	registerUserController,
} from "../controller/authController.js";
const authRouter = express.Router();
authRouter.post("/", authController);
authRouter.post("/signup", registerUserController);
authRouter.get("/all-users", getAllUsers);
export default authRouter;
