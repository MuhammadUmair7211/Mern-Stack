import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const CharacterSketch = () => {
	const { posts } = useApp();

	const filteredCharacter = posts.filter(
		(post) => post.category.toLowerCase() === "character sketches"
	);
	return (
		<div>
			{filteredCharacter.map((post, index) => {
				return <PostCard post={post} index={index} />;
			})}
		</div>
	);
};

export default CharacterSketch;
