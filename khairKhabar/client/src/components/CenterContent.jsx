import { useApp } from "../contexts/AppContext";
import PostCard from "./PostCard";

const CenterContent = () => {
	const { setShowSideBar, filteredPosts } = useApp();

	return (
		<div onClick={() => setShowSideBar(false)} className="relative">
			{filteredPosts.length > 0 ? (
				filteredPosts.map((post, index) => (
					<PostCard key={post._id} post={post} index={index} />
				))
			) : (
				<div className="flex flex-col items-center justify-center text-gray-500 mt-6">
					<span className="text-3xl mb-2">📅</span>
					<p className="text-sm">No posts available for this date</p>
				</div>
			)}
		</div>
	);
};

export default CenterContent;
