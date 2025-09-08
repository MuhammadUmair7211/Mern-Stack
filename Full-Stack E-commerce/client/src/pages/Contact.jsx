import { assets } from "../assets/frontend_assets/assets";

const Contact = () => {
	return (
		<div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-10">
			<div className="flex items-center justify-center py-8 border-t border-gray-300">
				<p className="flex items-center gap-2 text-2xl">
					<span className="text-gray-500">CONTACT</span>
					<span className="text-gray-600 after:content-[''] after:h-[1.5px] after:bg-gray-600 after:block after:w-12 font-medium flex items-center gap-2">
						US
					</span>
				</p>
			</div>
			<div className="flex flex-col md:flex-row md:items-center justify-center gap-12">
				{/* About Image */}
				<img
					src={assets.contact_img}
					alt="about-image"
					className="max-w-lg w-full md:w-1/2 shadow"
				/>

				{/* About Content */}
				<div className="max-w-3xl flex flex-col text-gray-700 space-y-5">
					<p className="text-xl md:text-2xl font-medium">Our Store</p>
					<p className="text-sm text-gray-500">Risalpur, District Nowshera</p>
					<h2 className="text-sm text-gray-500">Kpk, Pakistan</h2>
					<p className="text-sm text-gray-500">Tel: +92-3239385125</p>
					<p className="text-sm text-gray-500">
						Email: muhammadumair7211@gmail.com
					</p>
					<p className="text-sm text-gray-500">Careers at Forever</p>
					<p className="text-sm text-gray-500">
						Learn more about our teams and job openings.
					</p>
					<button className="border max-w-lg hover:bg-black hover:text-white px-5 py-3 duration-300 cursor-pointer">
						Explore Jobs
					</button>
				</div>
			</div>
		</div>
	);
};

export default Contact;
