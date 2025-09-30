import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Pakistan = () => {
	const { posts } = useApp();

	const filteredPakistan = posts.filter(
		(post) => post.category.toLowerCase() === "pakistan"
	);
	return (
		<div>
			{filteredPakistan.map((post, index) => {
				return <PostCard post={post} index={index} />;
			})}
		</div>
	);
};

export default Pakistan;
