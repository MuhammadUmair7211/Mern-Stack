import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
const Navbar = () => {
	const { text } = useApp();

	return (
		<nav className="bg-[#f5f1e6] shadow-md w-full text-sm z-50">
			<div className="max-w-screen-2xl mx-auto px-2 lg:px-8">
				<div className="flex justify-between items-center">
					<Link to="/" className="text-[#7b011e]">
						<p className="leading-4 md:leading-5 md:text-lg px-2">
							Khair <br />
							Khabar.com
						</p>
					</Link>
					<marquee
						behavior="scroll"
						direction="right"
						scrollamount="3"
						className="py-2 font-urdu"
					>
						{text}
					</marquee>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
