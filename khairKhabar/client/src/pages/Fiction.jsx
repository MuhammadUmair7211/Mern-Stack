import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Fiction = () => {
	const { posts } = useApp();

	const filteredFiction = posts.filter(
		(post) => post.category.toLowerCase() === "fiction"
	);
	return (
		<div>
			{filteredFiction.map((post, index) => {
				return <PostCard post={post} index={index} />;
			})}
		</div>
	);
};

export default Fiction;
