import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, dummyCarData } from "../assets/assets";

const CarsDetails = () => {
	const { id } = useParams();
	const [cars, setCars] = useState(null);
	useEffect(() => {
		setCars(dummyCarData.find((car) => car._id === id));
	}, [id]);
	console.log(cars);

	return cars ? (
		<div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
			<button
				onClick={() => history.back()}
				className="flex items-center gap-2 py-2 cursor-pointer text-gray-500"
			>
				<img
					src={assets.arrow_icon}
					alt="back-arrow"
					className="rotate-180 opacity-65"
				/>
				Back to all cars
			</button>
			<div className="flex items-start mt-2 flex-wrap justify-between">
				<div className="max-w-[60%]">
					<img
						src={cars.image}
						alt="car"
						className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
					/>
					<div className="border-b border-borderColor pb-5">
						<h1 className="text-2xl md:text-3xl font-bold mt-4">
							{cars.brand} {cars.model}
						</h1>
						<p className="text-gray-500 font-medium">
							{cars.category} - {cars.year}
						</p>
					</div>
					<div className="mt-10 flex items-center flex-wrap justify-between">
						<div className="bg-light px-10 py-4 flex flex-col items-center gap-3 rounded-lg">
							<img src={assets.users_icon} alt="seats" className="w-5 h-5" />
							<p>{cars.seating_capacity} seats</p>
						</div>
						<div className="bg-light px-10 py-4 flex flex-col items-center gap-3 rounded-lg">
							<img src={assets.fuel_icon} alt="fuel" className="w-5 h-5" />
							<p>{cars.fuel_type}</p>
						</div>
						<div className="bg-light px-10 py-4 flex flex-col items-center gap-3 rounded-lg">
							<img
								src={assets.car_icon}
								alt="transmission"
								className="w-5 h-5"
							/>
							<p>{cars.transmission}</p>
						</div>
						<div className="bg-light px-10 py-4 flex flex-col items-center gap-3 rounded-lg">
							<img
								src={assets.location_icon}
								alt="location"
								className="w-5 h-5"
							/>
							<p>{cars.location}</p>
						</div>
					</div>
					<div className="mt-6">
						<h1 className="text-xl font-semibold mb-2">Description</h1>
						<p className="text-gray-500">{cars.description}</p>
					</div>
					<div className="mt-2">
						<h1 className="text-xl font-medium my-4">Features</h1>
						<div className="flex items-start flex-wrap gap-30">
							<div>
								<div className="flex items-center gap-2 text-gray-500 my-2">
									<img src={assets.check_icon} alt="check" />
									<p>360 Camera</p>
								</div>
								<div className="flex items-center gap-2 text-gray-500 my-2">
									<img src={assets.check_icon} alt="check" />
									<p>GPS</p>
								</div>
								<div className="flex items-center gap-2 text-gray-500 my-2">
									<img src={assets.check_icon} alt="" />
									<p>Rear View Mirror</p>
								</div>
							</div>
							<div>
								<div className="flex items-center gap-2 text-gray-500 my-2">
									<img src={assets.check_icon} alt="" />
									<p>Bluetooth</p>
								</div>
								<div className="flex items-center gap-2 text-gray-500">
									<img src={assets.check_icon} alt="" />
									<p>Heated Seats</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="shadow-[0px_0px_5px_0px] sticky top-10 max-w-sm w-full rounded-xl">
					<form action="" className="p-6 shadow-lg h-max  rounded-xl space-y-6">
						<div className="flex items-center justify-between flex-wrap gap-20 border-b border-borderColor">
							<h1 className="text-2xl md:text-3xl">${cars.pricePerDay}</h1>
							<p className="text-gray-500">per day</p>
						</div>
						<div className="mt-5">
							<label htmlFor="pickup-date" className="block text-gray-500">
								Pickup date
							</label>
							<input
								type="date"
								className="border border-borderColor w-full px-2 py-2 rounded-lg mt-2 text-gray-500"
								required
								min={new Date().toISOString().split("T")[0]}
							/>
						</div>
						<div className="mt-5">
							<label htmlFor="return-date" className="block text-gray-500">
								Return date
							</label>
							<input
								type="date"
								className="border border-borderColor w-full px-2 py-2 mt-2 rounded-lg text-gray-500"
								required
							/>
						</div>
						<button className="bg-primary text-white w-full mt-8 py-2 rounded-lg">
							Book Now
						</button>
						<p className="text-gray-500 text-sm text-center mt-3 font-medium">
							No credit card required to reserve
						</p>
					</form>
				</div>
			</div>
		</div>
	) : (
		<h2>Loading...</h2>
	);
};

export default CarsDetails;
