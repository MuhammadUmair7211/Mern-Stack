import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Prose = () => {
	const { posts } = useApp();

	const filteredProse = posts.filter(
		(post) => post.category.toLowerCase() === "prose"
	);

	return (
		<div>
			{filteredProse.map((post, index) => {
				return <PostCard post={post} index={index} />;
			})}
		</div>
	);
};

export default Prose;
