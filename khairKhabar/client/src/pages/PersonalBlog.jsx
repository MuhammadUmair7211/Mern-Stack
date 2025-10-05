import { ScaleLoader } from "react-spinners";
import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const PersonalBlog = () => {
	const { filteredPosts, loading } = useApp();

	const filteredPersonalBlogs = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "personal blog"
	);

	return (
		<div>
			{loading ? (
				<div className="w-full min-h-screen flex items-center justify-center">
					<ScaleLoader height={55} />
				</div>
			) : filteredPersonalBlogs.length > 0 ? (
				<div className="grid gap-6">
					{filteredPersonalBlogs.map((post, index) => (
						<PostCard key={post._id || index} post={post} index={index} />
					))}
				</div>
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default PersonalBlog;
