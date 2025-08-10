import { useNavigate } from "react-router-dom";
import { assets, dummyCarData } from "../assets/assets";
import CarCard from "./CarCard";

const FeaturedSection = () => {
	const navigate = useNavigate();
	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
			<h1 className="text-2xl font-bold text-center">Featured Vehicles</h1>
			<p className="mt-2 text-gray-600 text-center">
				Explore our selection of premium vehicles available for your next
				adventure
			</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
				{dummyCarData.slice(0, 3).map((car, index) => {
					return <CarCard key={index} car={car} />;
				})}
			</div>
			<button
				onClick={() => navigate("/cars")}
				className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover::bg-gray-50 rounded-md mt-18 cursor-pointer mx-auto"
			>
				Explore all cars
				<img src={assets.arrow_icon} alt="arrow" />
			</button>
		</div>
	);
};

export default FeaturedSection;
