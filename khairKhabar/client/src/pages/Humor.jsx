import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Humor = () => {
	const { posts } = useApp();

	const filteredHumor = posts.filter(
		(post) => post.category.toLowerCase() === "humor"
	);
	return (
		<div>
			{filteredHumor.map((post, index) => {
				return <PostCard post={post} index={index} />;
			})}
		</div>
	);
};

export default Humor;
