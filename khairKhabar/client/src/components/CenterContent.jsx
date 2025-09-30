import { useApp } from "../contexts/AppContext";
import PostCard from "./PostCard";

const CenterContent = () => {
	const { posts } = useApp();

	return (
		<div>
			{posts.map((post, index) => {
				return <PostCard key={post._id} post={post} index={index} />;
			})}
		</div>
	);
};

export default CenterContent;
