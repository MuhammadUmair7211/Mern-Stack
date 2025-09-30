import { assets } from "../assets/assets";
import { useApp } from "../contexts/AppContext";

const Navbar = () => {
	const { phrase } = useApp();

	return (
		<nav className="bg-white lg:h-12 shadow-md w-full z-50">
			<div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center">
					<img src={assets.mainLogo} alt="main-logo" className="w-18 md:w-24" />
					<marquee
						behavior="scroll"
						direction="left"
						scrollamount="6"
						className="w-full"
					>
						{phrase}
					</marquee>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
