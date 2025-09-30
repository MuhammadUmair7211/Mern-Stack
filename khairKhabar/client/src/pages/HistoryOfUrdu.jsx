import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const HistoryOfUrdu = () => {
	const { posts } = useApp();

	const filteredHistory = posts.filter(
		(post) => post.category.toLowerCase() === "urdu history"
	);
	return (
		<div>
			{filteredHistory.map((post, index) => {
				return <PostCard post={post} index={index} />;
			})}
		</div>
	);
};

export default HistoryOfUrdu;
