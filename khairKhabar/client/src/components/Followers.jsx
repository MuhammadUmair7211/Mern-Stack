import { useApp } from "../contexts/AppContext";

const Followers = () => {
	const { followers, navigate } = useApp();

	return (
		<div className="p-2">
			<h2 className="text-xs font-bold pb-4">
				Followers : {followers?.length}
			</h2>
			<div className="text-[#f5f1e6] grid h-[300px] grid-cols-3 overflow-y-scroll md:grid-cols-3 lg:grid-cols-7 gap-2">
				{followers?.map((follower) => {
					return (
						<img
							key={follower._id}
							onClick={() => navigate(`/profile/${follower._id}`)}
							src={follower.image}
							alt={follower.username}
							className="w-10 rounded-full object-center object-cover cursor-pointer"
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Followers;
