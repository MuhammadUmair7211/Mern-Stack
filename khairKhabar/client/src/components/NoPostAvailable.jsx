const NoPostAvailable = () => {
	return (
		<div className="flex flex-col items-center justify-center text-gray-400 mt-12 space-y-3">
			<div className="text-5xl animate-bounce">📅</div>
			<h2 className="text-lg font-semibold text-gray-300">No posts yet!</h2>
			<p className="text-sm text-gray-500 text-center max-w-xs">
				Looks like there’s nothing to show right now. Try adding a new post or
				check back later!
			</p>
		</div>
	);
};

export default NoPostAvailable;
