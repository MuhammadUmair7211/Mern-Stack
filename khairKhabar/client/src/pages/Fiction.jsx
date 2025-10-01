import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Fiction = () => {
	const { filteredPosts } = useApp();

	const filteredFiction = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "fiction"
	);
	return (
		<div>
			{filteredFiction.length > 0 ? (
				filteredFiction.map((post, index) => (
					<PostCard key={post._id} post={post} index={index} />
				))
			) : (
				<div className="flex flex-col items-center justify-center text-gray-500 mt-6">
					<span className="text-3xl mb-2">📅</span>
					<p className="text-sm">No posts available for this date</p>
				</div>
			)}
		</div>
	);
};

export default Fiction;
