import express from "express";
import {
	allMessages,
	messageController,
} from "../controllers/messageController.js";
const messageRouter = express.Router();

messageRouter.post("/", messageController);
messageRouter.get("/:sender_Id/:receiver_Id", allMessages);
export default messageRouter;
