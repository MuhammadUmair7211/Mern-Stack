import assets from "../assets/assets";
import { CiMenuKebab } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const LeftSidebar = () => {
	const { user, setShowEditProfile, showEditProfile } = useUser();
	const navigate = useNavigate();
	return (
		<div className="bg-[#001030] text-white h-full hidden lg:flex flex-col gap-1">
			<div className="p-4">
				<div className="relative flex items-center justify-between">
					<img src={assets.logo} className="w-28" />
					<CiMenuKebab
						size={20}
						className="cursor-pointer"
						onClick={() => setShowEditProfile((prev) => !prev)}
					/>

					{showEditProfile && (
						<div
							onClick={(e) => e.stopPropagation()}
							className="absolute top-10 right-0 bg-white text-black shadow-lg rounded-lg w-30 py-2 z-50"
						>
							<button
								className="w-full text-left px-4 py-2 cursor-pointer duration-300 text-sm hover:bg-gray-100"
								onClick={() => navigate("/profile")}
							>
								Edit Profile
							</button>
							<hr className="border-gray-200" />
							<button
								className="w-full text-left px-4 py-2 cursor-pointer duration-300 text-sm text-red-600 hover:bg-gray-100"
								onClick={() => console.log("Logout")}
							>
								Logout
							</button>
						</div>
					)}
				</div>
				<div className="flex items-center gap-2 px-4 py-2 mt-8 bg-[#002670]">
					<CiSearch size={20} />
					<input
						type="text"
						name=""
						id=""
						placeholder="search..."
						className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
					/>
				</div>
			</div>
			<div className="overflow-y-scroll scrollbar-hide h-[70vh]">
				{Array(12)
					.fill("")
					.map((item, index) => {
						return (
							<div
								key={index}
								className="mt-2 flex items-center gap-4 hover:bg-[#077eff] hover:text-white py-2 px-4 cursor-pointer transition"
							>
								<img
									src={assets.profile_img}
									alt="User profile"
									className="w-12 h-12 object-cover rounded-full"
								/>
								<div>
									<p className="text-sm">{user}</p>
									<span className="text-sm text-gray-400">
										hello, how are you?
									</span>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default LeftSidebar;
