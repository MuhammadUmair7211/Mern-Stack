import express from "express";
import upload from "../config/multer.js";
import {
	deletePost,
	editLikePosts,
	editPost,
	getAllPosts,
	postController,
} from "../controller/postController.js";
const postRouter = express.Router();

postRouter.post("/add-new-post", upload.single("image"), postController);
postRouter.get("/get-all-posts", getAllPosts);
postRouter.delete("/delete-post/:id", deletePost);
postRouter.put("/edit-post/:id", upload.single("image"), editPost);
postRouter.post("/likes/:postId", editLikePosts);
export default postRouter;
