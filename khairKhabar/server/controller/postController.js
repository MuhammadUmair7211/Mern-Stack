import Post from "../models/Post.js";

export const postController = async (req, res) => {
	try {
		const { category, title, content, author } = req.body;

		let imageUrl = "";
		if (req.file) {
			imageUrl = req.file.path;
		}
		const newPost = new Post({
			category,
			title,
			content,
			author,
			image: imageUrl,
		});
		await newPost.save();
		return res.status(200).json({
			success: true,
			message: "Post created successfully!",
			post: newPost,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}
};

export const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().sort({ createdAt: -1 });
		res.status(200).json({ success: true, posts: posts });
	} catch (error) {
		console.error("Error fetching posts:", error.message);
		res.status(500).json({
			success: false,
			message: "Server Error while fetching posts",
		});
	}
};
export const deletePost = async (req, res) => {
	try {
		const { id } = req.params;
		const findPostById = await Post.findByIdAndDelete(id);
		if (!findPostById) {
			return res.json({ success: false, message: "Post not found" });
		}
		return res
			.status(200)
			.json({ success: true, message: "Post deleted successfully" });
	} catch (error) {
		console.error(error);
		return res.json({ success: false, message: "internal server error" });
	}
};

export const editPost = async (req, res) => {
	try {
		const { id } = req.params;
		const { category, title, content, author, image } = req.body;
		let imageUrl = "";
		if (req.file) {
			imageUrl = req.file.path;
		}
		const editedPost = await Post.findByIdAndUpdate(
			id,
			{
				category,
				title,
				content,
				author,
				...(imageUrl && { image: imageUrl }),
			},
			{ new: true, runValidators: true }
		);
		if (!editedPost) {
			return res
				.status(404)
				.json({ success: false, message: "Post not found" });
		}
		res.status(200).json({
			success: true,
			message: "Post updated successfully!",
			post: editedPost,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Server error while updating post",
			error: error.message,
		});
	}
};

export const editLikePosts = async (req, res) => {
	try {
		const { postId } = req.params;
		const { userId } = req.body;
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		// Toggle like logic
		if (post.likes.includes(userId)) {
			post.likes = post.likes.filter((id) => id !== userId);
		} else {
			post.likes.push(userId);
		}
		post.likes = post.likes.filter((id) => id !== null && id !== undefined);

		await post.save();
		res.status(200).json({
			success: true,
			likes: post.likes,
			message: "Updated successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};
