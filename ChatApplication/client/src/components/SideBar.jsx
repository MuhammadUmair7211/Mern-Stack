import assets from "../assets/assets";
import { CiMenuKebab } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { useUser } from "../context/UserContext";
import { IoMdClose } from "react-icons/io";
const SideBar = () => {
	const { user, setShowSideBar } = useUser();
	return (
		<div className="bg-[#001030] max-w-[1200px] p-6 w-full fixed text-white flex flex-col gap-1">
			<div className="p-4">
				<div className="flex items-center justify-between">
					<img src={assets.logo} className="w-28" />
					<IoMdClose
						size={25}
						className="cursor-pointer hover:text-[#2e3f61] duration-300 animate-bounce"
						onClick={() => setShowSideBar(false)}
					/>
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
					<CiMenuKebab size={20} className="cursor-pointer" />
				</div>
			</div>
			<div className="mt-2 flex items-center gap-4 hover:bg-[#077eff] hover:text-white py-2 px-2 cursor-pointer transition">
				<img
					src={assets.profile_img}
					alt="User profile"
					className="w-12 h-12 object-cover rounded-full"
				/>
				<span className="text-sm">{user}</span>
			</div>
		</div>
	);
};

export default SideBar;
