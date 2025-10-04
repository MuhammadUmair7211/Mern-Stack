import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Prose = () => {
	const { filteredPosts } = useApp();

	const filteredProse = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "prose"
	);

	return (
		<div>
			{filteredProse.length > 0 ? (
				filteredProse.map((post, index) => (
					<PostCard key={post._id} post={post} index={index} />
				))
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default Prose;
