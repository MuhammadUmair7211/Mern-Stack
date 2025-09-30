import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const LearnUrdu = () => {
	const { posts } = useApp();

	const filteredGrammar = posts.filter(
		(post) => post.category.toLowerCase() === "urdu grammar"
	);

	return (
		<div>
			{filteredGrammar.map((post, index) => {
				return <PostCard key={post._id} post={post} index={index} />;
			})}
		</div>
	);
};

export default LearnUrdu;
