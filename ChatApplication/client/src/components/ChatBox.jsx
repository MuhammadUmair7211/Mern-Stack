import assets from "../assets/assets";
import { CiSquareInfo } from "react-icons/ci";
import { TfiGallery } from "react-icons/tfi";
import { IoMdSend } from "react-icons/io";
import { useUser } from "../context/UserContext";
import { IoIosArrowBack } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
const ChatBox = () => {
	const { user, setShowSideBar } = useUser();

	return (
		<div className="bg-white mx-2 lg:mx-0 flex flex-col justify-between">
			<div className="mt-4 text-black flex items-center justify-between py-2 px-6 border-b border-gray-300">
				<div className="flex items-center gap-2">
					<img
						src={assets.pic2}
						className="w-10 h-10 object-cover rounded-full"
					/>
					<span className="text-xl">{user}</span>
					<GoDotFill className="text-md text-green-500" />
				</div>
				<div className="flex items-center">
					<div className="hidden lg:flex">
						<CiSquareInfo size={25} />
					</div>
					<div
						className="flex lg:hidden cursor-pointer"
						onClick={() => setShowSideBar(true)}
					>
						<IoIosArrowBack size={30} />
					</div>
				</div>
			</div>
			<div className="overflow-y-scroll scrollbar-hide h-[70vh] py-4 px-2">
				<div className="flex items-end gap-2">
					<img
						src={assets.profile_img}
						alt=""
						className="w-8 h-8 object-center rounded-full"
					/>
					<div className="bg-blue-500 flex flex-col items-end text-white px-4 py-2 rounded-r-[10px] rounded-tl-[10px]">
						<p className="text-sm max-w-[300px]">
							Hello this is my contact, please save this number, i'll call you
							when i am back
						</p>
						<span className="text-xs text-gray-100">2:00 pm</span>
					</div>
				</div>
				<div className="flex flex-row-reverse items-end gap-2 mt-4">
					<img
						src={assets.profile_img}
						alt=""
						className="w-8 h-8 object-center rounded-full"
					/>
					<div className="bg-blue-500 flex flex-col items-end text-white px-4 py-2 rounded-l-[10px] rounded-tr-[10px]">
						<p className="text-sm max-w-[300px]">
							Hello this is my contact, please save this information for future
							use
						</p>
						<span className="text-xs text-gray-100">2:00 pm</span>
					</div>
				</div>
				<div className="flex flex-row-reverse items-end gap-2 mt-4">
					<img
						src={assets.profile_img}
						alt=""
						className="w-8 h-8 object-center rounded-full"
					/>
					<div className="bg-blue-300 flex flex-col items-end text-white px-3 py-1 rounded-l-[10px] rounded-tr-[10px]">
						<img
							src={assets.pic2}
							alt=""
							className="w-[230px] object-center rounded-md mt-2"
						/>
						<span className="text-xs text-gray-100 mt-1">2:00 pm</span>
					</div>
				</div>
			</div>
			<form className="flex items-center justify-between text-black border border-gray-300 py-3 px-4">
				<input
					type="text"
					placeholder="send a message"
					className=" outline-none "
				/>
				<div className="flex items-center gap-4">
					<TfiGallery
						size={25}
						className="hover:text-green-500 duration-300 cursor-pointer"
					/>
					<IoMdSend
						size={30}
						className="text-blue-600 hover:text-blue-500 duration-300 cursor-pointer"
					/>
				</div>
			</form>
		</div>
	);
};

export default ChatBox;
