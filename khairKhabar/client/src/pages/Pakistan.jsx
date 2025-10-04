import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Pakistan = () => {
	const { filteredPosts } = useApp();

	const filteredPakistan = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "pakistan"
	);
	return (
		<div>
			{filteredPakistan.length > 0 ? (
				filteredPakistan.map((post, index) => (
					<PostCard key={post._id} post={post} index={index} />
				))
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default Pakistan;
