import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const LiteraryCriticism = () => {
	const { posts } = useApp();

	const filteredCriticism = posts.filter(
		(post) => post.category.toLowerCase() === "literary criticism"
	);
	return (
		<div>
			{filteredCriticism.map((post, index) => {
				return <PostCard post={post} index={index} />;
			})}
		</div>
	);
};

export default LiteraryCriticism;
