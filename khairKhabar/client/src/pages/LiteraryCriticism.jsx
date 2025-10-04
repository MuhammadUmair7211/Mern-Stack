import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const LiteraryCriticism = () => {
	const { filteredPosts } = useApp();

	const filteredCriticism = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "literary criticism"
	);
	return (
		<div>
			{filteredCriticism.length > 0 ? (
				filteredCriticism.map((post, index) => (
					<PostCard key={post._id} post={post} index={index} />
				))
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default LiteraryCriticism;
