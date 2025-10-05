import { ScaleLoader } from "react-spinners";
import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const LiteraryCriticism = () => {
	const { filteredPosts, loading } = useApp();

	const filteredCriticism = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "literary criticism"
	);
	return (
		<div>
			{loading ? (
				<div className="w-full min-h-screen flex items-center justify-center">
					<ScaleLoader height={55} />
				</div>
			) : filteredCriticism.length > 0 ? (
				<div className="grid gap-6">
					{filteredCriticism.map((post, index) => (
						<PostCard key={post._id || index} post={post} index={index} />
					))}
				</div>
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default LiteraryCriticism;
