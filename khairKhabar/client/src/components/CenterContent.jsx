import { ScaleLoader } from "react-spinners";
import { useApp } from "../contexts/AppContext";
import NoPostAvailable from "./NoPostAvailable";
import PostCard from "./PostCard";

const CenterContent = () => {
	const { setShowSideBar, filteredPosts, loading } = useApp();

	return (
		<div onClick={() => setShowSideBar(false)} className="relative">
			{loading ? (
				<div className="w-full min-h-screen flex items-center justify-center">
					<ScaleLoader height={55} />
				</div>
			) : filteredPosts.length > 0 ? (
				<div className="grid gap-6">
					{filteredPosts.map((post, index) => (
						<PostCard key={post._id || index} post={post} index={index} />
					))}
				</div>
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default CenterContent;
