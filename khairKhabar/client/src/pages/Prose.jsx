import { ScaleLoader } from "react-spinners";
import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Prose = () => {
	const { filteredPosts, loading } = useApp();

	const filteredProse = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "prose"
	);

	return (
		<div>
			{loading ? (
				<div className="w-full min-h-screen flex items-center justify-center">
					<ScaleLoader height={55} />
				</div>
			) : filteredProse.length > 0 ? (
				<div className="grid gap-6">
					{filteredProse.map((post, index) => (
						<PostCard key={post._id || index} post={post} index={index} />
					))}
				</div>
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default Prose;
