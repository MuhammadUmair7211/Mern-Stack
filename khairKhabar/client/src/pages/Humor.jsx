import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Humor = () => {
	const { filteredPosts } = useApp();

	const filteredHumor = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "humor"
	);
	return (
		<div>
			{filteredHumor.length > 0 ? (
				filteredHumor.map((post, index) => (
					<PostCard key={post._id} post={post} index={index} />
				))
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default Humor;
