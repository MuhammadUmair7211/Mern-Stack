import { assets } from "../assets/assets";

const Banner = () => {
	return (
		<div className="max-w-6xl py-10 bg-gradient-to-r from-[#0558FE] to [#A9CFFF] text-white md:mx-auto px-8 min-md:pl-14 flex flex-col md:flex-row md:items-start mx-3 items-center justify-between gap-10 rounded-2xl">
			<div>
				<h1 className="text-3xl font-medium">Do You Own a Luxury Car?</h1>
				<p className="mt-4 text-lg">
					Monetize your vehicle effortlessly by listing it on a CarRental.
				</p>
				<p>
					We take care of insurance, driver verification and secure payments -
					so <br /> you can earn passive income, stress-free.
				</p>
				<button className="px-4 py-2 cursor-pointer bg-white text-primary mt-5 rounded-md hover:bg-gray-100 transition-colors">
					List your car
				</button>
			</div>
			<div>
				<img
					src={assets.banner_car_image}
					alt="car-banner"
					className="max-h-45"
				/>
			</div>
		</div>
	);
};

export default Banner;
