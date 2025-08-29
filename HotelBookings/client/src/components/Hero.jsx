import { useState } from "react";
import { assets, cities } from "../assets/assets";

const Hero = () => {
	const [formData, setFormData] = useState({
		destination: "",
		checkInDate: "",
		checkOutDate: "",
		guests: "",
	});

	const handleFormSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};
	return (
		<div className="min-h-screen flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url('/src/assets/heroImage.png')] bg-no-repeat bg-cover bg-center">
			<p className="bg-[#49B9ff]/50 px-3.5 inline-block py-1 rounded-full mt-20">
				The ultimate hotel experience
			</p>
			<h1 className="text-xl md:text-5xl md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">
				Discover Your Perfect Gateway Destination
			</h1>
			<p className="max-w-130 mt-3 text-sm md:text-base">
				Unparalleled luxury and comfort await at the world's most exclusive{" "}
				hotels and resorts. Start your journey today.
			</p>
			<form
				onSubmit={handleFormSubmit}
				className="flex flex-wrap items-end gap-4 bg-white text-gray-600 p-4 mt-4 rounded-lg"
			>
				<div>
					<div className="flex items-center gap-2">
						<img
							src={assets.locationIcon}
							alt="calendar-icon"
							className="h-4"
						/>
						<label htmlFor="destination-input">Destination</label>
					</div>
					<input
						type="search"
						placeholder="Type here"
						list="destinations"
						id="destination-input"
						required
						value={formData.destination}
						onChange={(e) =>
							setFormData({ ...formData, destination: e.target.value })
						}
						className="outline-none rounded border border-gray-200 mt-1.5 px-3 py-1.5"
					/>
					<datalist id="destinations">
						{cities.map((city, index) => (
							<option key={index}>{city}</option>
						))}
					</datalist>
				</div>
				<div>
					<div className="flex items-center gap-2">
						<img
							src={assets.calenderIcon}
							alt="calendar-icon"
							className="h-4"
						/>
						<label htmlFor="check-in">Check in</label>
					</div>
					<input
						type="date"
						placeholder="Type here"
						value={formData.checkInDate}
						onChange={(e) =>
							setFormData({ ...formData, checkInDate: e.target.value })
						}
						required
						min={new Date().toISOString().split("T")[0]}
						className="outline-none rounded border border-gray-200 mt-1.5 px-3 py-1.5"
					/>
				</div>
				<div>
					<div className="flex items-center gap-2">
						<img
							src={assets.calenderIcon}
							alt="calendar-icon"
							className="h-4"
						/>
						<label htmlFor="check-in">Check out</label>
					</div>
					<input
						type="date"
						placeholder="Type here"
						value={formData.checkOutDate}
						onChange={(e) =>
							setFormData({ ...formData, checkOutDate: e.target.value })
						}
						required
						min={new Date().toISOString().split("T")[0]}
						className="outline-none rounded border border-gray-200 mt-1.5 px-3 py-1.5"
					/>
				</div>
				<div>
					<div>
						<label htmlFor="check-in">Guests</label>
					</div>
					<input
						type="number"
						placeholder="0"
						value={formData.guests}
						onChange={(e) =>
							setFormData({ ...formData, guests: e.target.value })
						}
						required
						min={0}
						className="outline-none rounded border border-gray-200 mt-1.5 px-3 py-1.5 w-16"
					/>
				</div>
				<button
					type="submit"
					className="bg-black w-full md:w-auto text-white hover:bg-black/90 duration-300 cursor-pointer flex items-center justify-center rounded-lg px-4 py-2"
				>
					<img src={assets.searchIcon} alt="search" />
					Search
				</button>
			</form>
		</div>
	);
};

export default Hero;
