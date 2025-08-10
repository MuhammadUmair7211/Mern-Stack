import { useState } from "react";
import { assets, cityList } from "../assets/assets";

const Hero = () => {
	const [location, setLocation] = useState("");
	return (
		<div className="h-screen flex flex-col items-center gap-4 justify-center bg-light text-center">
			<h1 className="text-4xl md:text-5xl font-semibold">
				Luxury cars on Rent
			</h1>
			<form
				action=""
				className="flex flex-col w-80 gap-5 text-left md:text-center max-w-4xl md:w-full bg-white md:rounded-full md:flex-row p-6 items-center justify-between mt-8 shadow-[0px_0px_5px_0px]"
			>
				<div className="flex flex-col items-start">
					<select
						name=""
						id=""
						required
						value={location}
						className="outline-none"
						onChange={(e) => {
							setLocation(e.target.value);
						}}
					>
						<option value="" hidden>
							Pickup location
						</option>
						{cityList.map((city, index) => {
							return (
								<option key={index} value={city}>
									{city}
								</option>
							);
						})}
					</select>
					<p className="text-gray-500 text-sm ms-1">
						{location ? location : "Please select location"}
					</p>
				</div>
				<div className="flex flex-col items-start">
					<label>Pickup Date</label>
					<input
						type="date"
						id="pickup-date"
						min={new Date().toISOString().split("T")[0]}
						required
						className="text-gray-500 text-sm outline-none"
					/>
				</div>
				<div className="flex flex-col items-start">
					<label>Return Date</label>
					<input
						type="date"
						id="return-date"
						required
						min={new Date().toISOString().split("T")[0]}
						className="text-gray-500 text-sm outline-none"
					/>
				</div>
				<button className="bg-primary text-white hover:bg-primary-dull duration-300 px-8 py-4 rounded-full flex items-center gap-2 cursor-pointer">
					<img
						src={assets.search_icon}
						alt="search"
						className="brightness-300 h-6 md:8 "
					/>
					Search
				</button>
			</form>
			<img src={assets.main_car} alt="car" className="max-h-74" />
		</div>
	);
};

export default Hero;
