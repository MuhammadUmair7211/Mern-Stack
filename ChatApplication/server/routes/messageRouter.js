import express from "express";
import {
	allMessages,
	messageController,
} from "../controllers/messageController.js";
import upload from "../middleware/multer.js";
const messageRouter = express.Router();

messageRouter.post("/", upload.single("image"), messageController);
messageRouter.get("/:sender_Id/:receiver_Id", allMessages);
export default messageRouter;
