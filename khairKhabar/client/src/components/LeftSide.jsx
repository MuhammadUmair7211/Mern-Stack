import { useApp } from "../contexts/AppContext";
import SearchByDate from "./SearchByDate";
import Followers from "./Followers";
import FollowButton from "./FollowButton";
const LeftSide = () => {
	const { navigate } = useApp();

	return (
		<div className="p-4 bg-[#f5f1e6] text-[#7b011e] hidden lg:flex flex-col items-center justify-around">
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
					className="bg-[#7b011e] text-[#f5f1e6] hover:bg-[#f5f1e6] hover:text-[#7b011e] border hover:border-gray-300 px-2 lg:px-5 py-2 rounded-full cursor-pointer duration-300 text-xs"
				>
					View My Profile
				</button>

				{/* Secondary Button */}
				<button
					onClick={() => navigate("/admin-login")}
					className="bg-[#f5f1e6] text-[#7b011e] hover:bg-[#7b011e] hover:text-[#f5f1e6] border border-gray-300 px-2 lg:px-5 py-2 rounded-full duration-300 cursor-pointer text-xs"
				>
					Admin Dashboard
				</button>
			</div>
			<SearchByDate />
			<Followers />
			<FollowButton />
		</div>
	);
};

export default LeftSide;
