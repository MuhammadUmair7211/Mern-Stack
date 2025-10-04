import express from "express";
import upload from "../config/multer.js";
import {
	deletePost,
	editLikePosts,
	editPost,
	getAllPosts,
	postController,
} from "../controller/postController.js";
import { verifyAdmin } from "../middleware/VerifyAdmin.js";
const postRouter = express.Router();

postRouter.post(
	"/add-new-post",
	verifyAdmin,
	upload.single("image"),
	postController
);
postRouter.get("/get-all-posts", getAllPosts);
postRouter.delete("/delete-post/:id", verifyAdmin, deletePost);
postRouter.put("/edit-post/:id", verifyAdmin, upload.single("image"), editPost);
postRouter.post("/likes/:postId", verifyAdmin, editLikePosts);
export default postRouter;
