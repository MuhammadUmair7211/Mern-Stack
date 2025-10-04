import NoPostAvailable from "../components/NoPostAvailable";
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
				filteredPoetry.map((post, index) => (
					<PostCard key={post._id} post={post} index={index} />
				))
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default Poetry;
