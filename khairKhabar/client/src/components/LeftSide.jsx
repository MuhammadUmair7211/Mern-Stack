import { NavLink } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
const LeftSide = () => {
	const { followers, filter, setFilter, navigate } = useApp();

	return (
		<div className="p-4 bg-amber-200 hidden lg:flex flex-col items-center justify-around">
			<div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
				<svg
					className="w-15 h-15 text-gray-600"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
				</svg>
			</div>
			<div className="flex items-center gap-2 flex-wrap">
				{/* Primary Button */}
				<button
					onClick={() => navigate("/about")}
					className="bg-gray-900 px-2 lg:px-5 py-2 rounded-full text-white hover:bg-white hover:text-black border border-black hover:border-white cursor-pointer duration-300 text-xs"
				>
					View My Profile
				</button>

				{/* Secondary Button */}
				<button
					onClick={() => navigate("/admin-login")}
					className="bg-transparent px-2 lg:px-5 py-2 rounded-full border border-gray-600 text-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-900  duration-300 cursor-pointer text-xs"
				>
					Admin Dashboard
				</button>
			</div>
			<div className="w-full">
				<label htmlFor="search" className="text-sm block mb-2">
					Search posts by Date:
				</label>
				<input
					id="search"
					type="date"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className="w-full p-2 shadow-[0_0_5px_0] text-sm outline-none"
				/>
			</div>

			<div className="overflow-y-scroll max-h-[300px] px-2 h-full">
				<h2 className="text-xs font-bold pb-2">
					Followers : {followers.length}
				</h2>
				<div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-7 gap-2">
					{followers.map((follower) => {
						return (
							<img
								key={follower._id}
								src={follower.avatar}
								alt={follower.name}
								className="w-10 rounded-full object-center object-cover"
							/>
						);
					})}
				</div>
			</div>
			<button className="bg-gray-500 text-white/70 px-4 py-2 text-sm rounded-md hover:bg-gray-600 hover:text-white cursor-pointer duration-300">
				Follow <NavLink to="/">khairKhabar.com</NavLink>
			</button>
		</div>
	);
};

export default LeftSide;
