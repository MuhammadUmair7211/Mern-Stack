import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const HistoryOfUrdu = () => {
	const { filteredPosts } = useApp();

	const filteredHistory = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "urdu history"
	);
	return (
		<div>
			{filteredHistory.length > 0 ? (
				filteredHistory.map((post, index) => (
					<PostCard key={post._id} post={post} index={index} />
				))
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default HistoryOfUrdu;
