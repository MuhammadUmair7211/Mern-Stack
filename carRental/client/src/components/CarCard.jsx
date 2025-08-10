import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const CarCard = ({ car }) => {
	const navigate = useNavigate();
	return (
		<div
			onClick={() => navigate(`/cars-details/${car._id}`)}
			className="group rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer"
		>
			<div className="relative h-48 overflow-hidden">
				<img
					src={car.image}
					alt="car-image"
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				{car.isAvailable && (
					<p className="absolute top-4 left-4 bg-blue-500 text-white text-xs px-2.5 py-2 rounded-full">
						Available Now
					</p>
				)}
				<div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
					<span className="font-semibold">${car.pricePerDay}</span>
					<span className="text-gray-200 text-sm">/ day</span>
				</div>
			</div>
			<div className="px-6 py-4 mt-5">
				<div>
					<h1 className="font-bold text-lg text-gray-800">
						{car.brand} <span>{car.model}</span>
					</h1>
					<h2>
						{car.category} - {car.year}
					</h2>
				</div>
				<div className="mt-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<img src={assets.users_icon} alt="capacity" className="w-5 h-5" />
							<p>{car.seating_capacity} seats</p>
						</div>
						<div className="flex items-center gap-2">
							<img src={assets.fuel_icon} alt="fuel" className="w-5 h-5" />
							<p>{car.fuel_type}</p>
						</div>
					</div>
					<div className="flex items-center justify-between mt-4">
						<div className="flex items-center gap-2">
							<img
								src={assets.car_icon}
								alt="transmission"
								className="w-5 h-5"
							/>
							<p>{car.transmission}</p>
						</div>
						<div className="flex items-center">
							<img
								src={assets.location_icon}
								alt="location"
								className="w-5 h-5"
							/>
							<p>{car.location}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CarCard;
