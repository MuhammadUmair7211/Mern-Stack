import { assets } from "../assets/frontend_assets/assets";

const Nav = () => {
	return (
		<nav className="border-b border-gray-300 px-4 md:px-16 lg:px-24 py-4">
			<div className="flex items-center justify-between">
				<div className="flex flex-col items-start">
					<img src={assets.logo} alt="logo" className="max-w-[170px]" />
					<span className="uppercase text-[#cb92ae] text-sm font-medium -mt-2">
						Admin Panel
					</span>
				</div>

				<button className="bg-black px-6 py-2 cursor-pointer text-white">
					Logout
				</button>
			</div>
		</nav>
	);
};

export default Nav;
