import { useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";

const AddCar = () => {
	const [image, setImage] = useState(null);
	const [car, setCar] = useState({
		brand: "",
		model: "",
		year: "",
		dailyPrice: "",
		category: "",
		transmission: "",
		fuelType: "",
		seatingCapacity: "",
		location: "",
		description: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<div className="px-4 md:px-10 my-8">
			<div>
				<Title
					title="Add New Car"
					subtitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
				/>
			</div>
			<form onSubmit={handleSubmit} className="max-w-xl">
				<div className="flex items-center flex-wrap gap-2 w-full text-sm mt-6">
					<label htmlFor="car-image">
						<img
							src={assets.upload_icon}
							alt="upload-icon"
							className="h-14 rounded cursor-pointer"
						/>
						<input
							type="file"
							id="car-image"
							accept="image/*"
							hidden
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</label>
					<p className="text-sm text-gray-500">Upload a picture of your car</p>
				</div>
				<div className="grid grid-cols-1 text-gray-500  md:grid-cols-2 gap-6 mt-5">
					<div className="flex flex-col w-full">
						<label htmlFor="brand" className="text-sm">
							Brand
						</label>
						<input
							type="text"
							placeholder="e.g. BMW, Mercedes, Audi..."
							className="border border-borderColor mt-1 px-3 py-2 text-sm rounded-md outline-none"
							required
							value={car.brand}
							onChange={(e) => setCar({ ...car, brand: e.target.value })}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="brand" className="text-sm">
							Model
						</label>
						<input
							type="text"
							placeholder="e.g. X5, E-Class, M4"
							className="border border-borderColor mt-1 px-3 text-sm py-2 rounded-lg outline-none"
							required
							value={car.model}
							onChange={(e) => setCar({ ...car, model: e.target.value })}
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-gray-500 gap-6 mt-5">
					<div className="flex flex-col w-full">
						<label htmlFor="year" className="text-sm">
							Year
						</label>
						<input
							type="text"
							placeholder="0"
							className="border border-borderColor mt-1 px-3 text-sm py-2 rounded-lg outline-none"
							required
							value={car.year}
							onChange={(e) => setCar({ ...car, year: e.target.value })}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="brand" className="text-sm">
							Daily Price ($)
						</label>
						<input
							type="text"
							placeholder="0"
							className="border border-borderColor mt-1 px-3 text-sm py-2 rounded-lg outline-none"
							required
							value={car.dailyPrice}
							onChange={(e) => setCar({ ...car, dailyPrice: e.target.value })}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="brand" className="text-sm">
							Category
						</label>
						<select
							className="border border-borderColor mt-1 px-3 text-sm py-2 rounded-lg outline-none cursor-pointer"
							required
							value={car.category}
							onChange={(e) => setCar({ ...car, category: e.target.value })}
						>
							<option hidden>Select Category</option>
							<option value="sedan">Sedan</option>
							<option value="suv">Suv</option>
							<option value="van">Van</option>
						</select>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-gray-500 gap-6 mt-5">
					<div className="flex flex-col w-full">
						<label htmlFor="year" className="text-sm">
							Transmission
						</label>
						<select
							className="border border-borderColor mt-1 px-3 text-sm py-2 rounded-lg outline-none cursor-pointer"
							required
							value={car.transmission}
							onChange={(e) => setCar({ ...car, transmission: e.target.value })}
						>
							<option hidden>Select Transmission</option>
							<option value="auto">Automatic</option>
							<option value="man">Manual</option>
							<option value="semi">Semi-Automatic</option>
						</select>
					</div>
					<div className="flex flex-col">
						<label htmlFor="brand" className="text-sm">
							Fuel Type
						</label>
						<select
							className="border border-borderColor mt-1 px-3 text-sm py-2 rounded-lg outline-none cursor-pointer"
							required
							value={car.fuelType}
							onChange={(e) => setCar({ ...car, fuelType: e.target.value })}
						>
							<option hidden>Select Fuel Type</option>
							<option value="auto">Gas</option>
							<option value="man">Diesel</option>
							<option value="semi">Petrol</option>
							<option value="semi">Hybrid</option>
							<option value="semi">Electric</option>
						</select>
					</div>
					<div className="flex flex-col">
						<label htmlFor="brand" className="text-sm">
							Seating Capacity
						</label>
						<input
							type="number"
							placeholder="0"
							className="border border-borderColor mt-1 px-3 text-sm py-2 rounded-lg outline-none"
							required
							value={car.seatingCapacity}
							onChange={(e) =>
								setCar({ ...car, seatingCapacity: e.target.value })
							}
						/>
					</div>
				</div>
				<div className="mt-5 text-gray-500">
					<div className="flex flex-col w-full">
						<label htmlFor="location" className="text-sm">
							Location
						</label>
						<select
							name=""
							id=""
							className="border border-borderColor mt-1 px-3 text-sm py-2 rounded-lg outline-none cursor-pointer"
							value={car.location}
							onChange={(e) => setCar({ ...car, location: e.target.value })}
						>
							<option value="" hidden>
								Select Location
							</option>
							<option value="">New York</option>
							<option value="">Chicago</option>
							<option value="">Houston</option>
							<option value="">Washington</option>
						</select>
					</div>
				</div>
				<div className="mt-4 text-gray-500">
					<div className="flex flex-col w-full">
						<label htmlFor="location" className="text-sm">
							Description
						</label>
						<textarea
							name=""
							id=""
							className="border border-borderColor mt-1 px-3 text-sm py-2 rounded-lg outline-none cursor-pointer resize-none"
							placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine."
							rows={5}
						></textarea>
					</div>
				</div>
				<button className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer">
					<img src={assets.tick_icon} alt="check-icon" />
					List Your Car
				</button>
			</form>
		</div>
	);
};

export default AddCar;
