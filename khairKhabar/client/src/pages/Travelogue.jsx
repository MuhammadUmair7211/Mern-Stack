import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Travelogue = () => {
	const { filteredPosts } = useApp();

	const filteredTravelogues = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "travelogue"
	);

	return (
		<div>
			{filteredTravelogues.length > 0 ? (
				filteredTravelogues.map((post, index) => (
					<PostCard key={post._id} post={post} index={index} />
				))
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default Travelogue;
