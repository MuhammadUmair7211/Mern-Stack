import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Poetry = () => {
	const { posts } = useApp();

	const filteredPoetry = posts.filter(
		(post) => post.category.toLowerCase() === "poetry"
	);

	return (
		<div>
			{filteredPoetry.map((post, index) => {
				return <PostCard key={post._id} post={post} index={index} />;
			})}
		</div>
	);
};

export default Poetry;
