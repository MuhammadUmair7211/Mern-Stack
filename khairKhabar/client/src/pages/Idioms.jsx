import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Idioms = () => {
	const { filteredPosts } = useApp();

	const filteredIdioms = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "idioms"
	);
	return (
		<div>
			{filteredIdioms.length > 0 ? (
				filteredIdioms.map((post, index) => (
					<PostCard key={post._id} post={post} index={index} />
				))
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default Idioms;
