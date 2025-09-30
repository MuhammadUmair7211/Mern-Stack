import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Travelogue = () => {
	const { posts } = useApp();

	const filteredTravelogues = posts.filter(
		(post) => post.category.toLowerCase() === "travelogue"
	);

	return (
		<div>
			{filteredTravelogues.map((post, index) => {
				return <PostCard key={post._id} post={post} index={index} />;
			})}
		</div>
	);
};

export default Travelogue;
