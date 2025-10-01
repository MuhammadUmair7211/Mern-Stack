import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Poetry = () => {
	const { filteredPosts } = useApp();

	const filteredPoetry = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "poetry"
	);

	return (
		<div>
			{filteredPoetry.length > 0 ? (
				filteredPosts.map((post, index) => (
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

export default Poetry;
