import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
	return (
		<div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
			<div className="grid grid-cols-1 md:grid-cols-2 border border-gray-400">
				<div className="flex items-center justify-center p-6">
					<div className="space-y-2">
						<p className="text-gray-700 font-medium before:content-[''] before:w-12 before:h-[2px] before:block before:bg-gray-600 uppercase tracking-widest flex items-center gap-2">
							OUR BESTSELLERS
						</p>
						<p className="font-prata text-2xl md:text-4xl lg:text-5xl text-gray-700">
							Latest Arrivals
						</p>
						<p className="text-gray-700 uppercase tracking-widest after:content-[''] after:h-[1.5px] after:bg-gray-600 after:block after:w-12 font-semibold flex items-center gap-2">
							SHOP NOW
						</p>
					</div>
				</div>
				<div className="col">
					<img
						src={assets.hero_img}
						alt="hero-image"
						className="w-full h-full object-cover"
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
