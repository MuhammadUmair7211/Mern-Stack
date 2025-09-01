import { GoDotFill } from "react-icons/go";
import { MediaImages } from "../assets/assets";
import { useUser } from "../context/UserContext";

const RightSidebar = () => {
	const { user, logout } = useUser();
	return (
		<div className="bg-[#001030] text-white hidden lg:flex flex-col justify-between">
			<div>
				<div className="p-6 flex border-b border-gray-500 flex-col items-center gap-2">
					<img
						src={user?.image}
						alt="User profile"
						className="w-28 h-28 object-cover rounded-full"
					/>
					<div className="flex items-center gap-1">
						<span className="text-xl font-medium">
							{user ? user.username : <p>Guest</p>}
						</span>
						<GoDotFill className="text-md text-green-500" />
					</div>
					<div className="text-[12px] text-gray-400">
						{user ? user.bio : <p>Hey,I'm using chatApp</p>}
					</div>
				</div>
				<div className="mt-4 px-2">
					<h3 className="text-sm font-semibold text-gray-300 mb-2">Media</h3>
					{MediaImages.length > 0 ? (
						<div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
							{MediaImages.map((image, index) => (
								<img
									key={index}
									src={image}
									alt={`media-${index}`}
									className="rounded-lg object-cover w-full h-32"
								/>
							))}
						</div>
					) : (
						<p className="text-gray-500 text-xs">No media shared yet</p>
					)}
				</div>
			</div>
			<div className="mx-auto p-4 ">
				<button
					onClick={logout}
					className="text-red-500 py-2 px-6 rounded-full bg-white hover:scale-105 cursor-pointer duration-300"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default RightSidebar;
