import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const LearnUrdu = () => {
	const { filteredPosts } = useApp();

	const filteredGrammar = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "urdu grammar"
	);

	return (
		<div>
			{filteredGrammar.length > 0 ? (
				filteredGrammar.map((post, index) => (
					<PostCard key={post._id} post={post} index={index} />
				))
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default LearnUrdu;
