import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const PersonalBlog = () => {
	const { posts } = useApp();

	const filteredPersonalBlogs = posts.filter(
		(post) => post.category.toLowerCase() === "personal blog"
	);

	return (
		<div>
			{filteredPersonalBlogs.map((post, index) => {
				return <PostCard key={post._id} post={post} index={index} />;
			})}
		</div>
	);
};

export default PersonalBlog;
