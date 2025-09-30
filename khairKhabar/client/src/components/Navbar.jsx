import { assets } from "../assets/assets";
import { useApp } from "../contexts/AppContext";

const Navbar = () => {
	const { phrase } = useApp();

	return (
		<nav className="bg-white shadow-md w-full z-50">
			<div className="max-w-screen-2xl mx-auto px-2 lg:px-8">
				<div className="flex justify-between items-center">
					<img src={assets.mainLogo} alt="main-logo" className="w-18 lg:w-22" />
					<marquee
						behavior="scroll"
						direction="right"
						scrollamount="3"
						className="py-2 font-urdu"
					>
						{phrase}
					</marquee>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
