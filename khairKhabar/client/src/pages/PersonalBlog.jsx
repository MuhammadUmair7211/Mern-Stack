import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const PersonalBlog = () => {
	const { filteredPosts } = useApp();

	const filteredPersonalBlogs = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "personal blog"
	);

	return (
		<div>
			{filteredPersonalBlogs.length > 0 ? (
				filteredPersonalBlogs.map((post, index) => (
					<PostCard key={post._id} post={post} index={index} />
				))
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default PersonalBlog;
