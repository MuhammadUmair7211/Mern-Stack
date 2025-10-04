import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Fiction = () => {
	const { filteredPosts } = useApp();

	const filteredFiction = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "fiction"
	);
	return (
		<div>
			{filteredFiction.length > 0 ? (
				filteredFiction.map((post, index) => (
					<PostCard key={post._id} post={post} index={index} />
				))
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default Fiction;
