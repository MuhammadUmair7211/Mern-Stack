import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const CharacterSketch = () => {
	const { filteredPosts } = useApp();

	const filteredCharacter = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "character sketches"
	);
	return (
		<div>
			{filteredCharacter.length > 0 ? (
				filteredCharacter.map((post, index) => (
					<PostCard key={post._id} post={post} index={index} />
				))
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default CharacterSketch;
