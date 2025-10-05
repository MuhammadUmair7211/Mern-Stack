import { ScaleLoader } from "react-spinners";
import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Humor = () => {
	const { filteredPosts, loading } = useApp();

	const filteredHumor = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "humor"
	);
	return (
		<div>
			{loading ? (
				<div className="w-full min-h-screen flex items-center justify-center">
					<ScaleLoader height={55} />
				</div>
			) : filteredHumor.length > 0 ? (
				<div className="grid gap-6">
					{filteredHumor.map((post, index) => (
						<PostCard key={post._id || index} post={post} index={index} />
					))}
				</div>
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default Humor;
