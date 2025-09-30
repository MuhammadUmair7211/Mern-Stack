import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Idioms = () => {
	const { posts } = useApp();

	const filteredIdioms = posts.filter(
		(post) => post.category.toLowerCase() === "idioms"
	);
	return (
		<div>
			{filteredIdioms.map((post, index) => {
				return <PostCard post={post} index={index} />;
			})}
		</div>
	);
};

export default Idioms;
