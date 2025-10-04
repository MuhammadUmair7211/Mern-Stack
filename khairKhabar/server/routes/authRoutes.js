import express from "express";
import {
	getAllUsers,
	registerUserController,
} from "../controller/authController.js";
const authRouter = express.Router();
authRouter.post("/signup", registerUserController);
authRouter.get("/all-users", getAllUsers);
export default authRouter;
