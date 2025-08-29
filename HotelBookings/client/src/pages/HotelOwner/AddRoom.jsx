import { useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/Title";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const AddRoom = () => {
	const { axios, getToken } = useAppContext();
	const rooms = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
	const [images, setImages] = useState({
		1: null,
		2: null,
		3: null,
		4: null,
	});

	const [inputs, setInputs] = useState({
		roomType: "",
		pricePerNight: 0,
		amenities: {
			"Free Wifi": false,
			"Free Breakfast": false,
			"Room Service": false,
			"Mountain View": false,
			"Pool Access": false,
		},
	});
	const handleFormSubmit = async (e) => {
		console.log(inputs);
		const token = await getToken();
		e.preventDefault();
		if (
			!inputs.roomType ||
			!inputs.pricePerNight ||
			!inputs.amenities ||
			!Object.values(images).some((image) => image)
		) {
			toast.error("please fill in all the details");
			return;
		}
		try {
			const formData = new FormData();
			formData.append("roomType", inputs.roomType);
			formData.append("pricePerNight", inputs.pricePerNight);
			const amenities = Object.keys(inputs.amenities).filter(
				(key) => inputs.amenities[key]
			);
			formData.append("amenities", JSON.stringify(amenities));
			Object.keys(images).forEach(
				(key) => images[key] && formData.append("images", images[key])
			);
			const { data } = await axios.post("/api/rooms/", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(data);

			if (data.success) {
				toast.success(data.message);
				setInputs({
					roomType: "",
					pricePerNight: "",
					amenities: {
						"Free Wifi": false,
						"Free Breakfast": false,
						"Room Service": false,
						"Mountain View": false,
						"Pool Access": false,
					},
				});
				setImages({ 1: null, 2: null, 3: null, 4: null });
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<form onSubmit={handleFormSubmit}>
			{/* Page Heading */}
			<Title
				title="Add Room"
				subtitle="Fill in the details carefully. Accurate room details, pricing, and amenities will enhance the user booking experience."
				align="left"
			/>

			{/* Image Upload Section */}
			<div className="mt-6">
				<p className="text-gray-600 font-medium mb-2">Images</p>
				<div className="flex items-center gap-4 flex-wrap">
					{Object.keys(images).map((key) => (
						<label
							key={key}
							htmlFor={`roomImage ${key}`}
							className="cursor-pointer rounded-lg flex items-center justify-center hover:border-blue-400 transition"
						>
							<img
								className="max-h-13"
								src={
									images[key]
										? URL.createObjectURL(images[key])
										: assets.uploadArea
								}
								alt="Upload"
							/>
							<input
								type="file"
								accept="image/*"
								hidden
								id={`roomImage ${key}`}
								onChange={(e) =>
									setImages({ ...images, [key]: e.target.files[0] })
								}
							/>
						</label>
					))}
				</div>
			</div>

			<div className="mt-10 space-y-6">
				<div className="flex flex-wrap gap-10">
					<div>
						<p className="text-gray-800">Room Type</p>
						<select
							value={inputs.roomType}
							onChange={(e) =>
								setInputs({ ...inputs, roomType: e.target.value })
							}
							className="border border-gray-300 mt-2 px-4 py-2 outline-none rounded "
						>
							<option value="" disabled hidden>
								Select Room Type
							</option>
							{rooms.map((room, index) => (
								<option key={index} value={room}>
									{room}
								</option>
							))}
						</select>
					</div>

					<div>
						<p className="text-gray-700">
							Price / <span className="text-xs">night</span>
						</p>
						<input
							value={inputs.pricePerNight}
							type="number"
							id="price"
							placeholder="0"
							min={0}
							onChange={(e) =>
								setInputs({ ...inputs, pricePerNight: Number(e.target.value) })
							}
							className="border border-gray-300 w-24 p-2 mt-2 outline-none rounded "
						/>
					</div>
				</div>

				<div>
					<p className="mb-3 font-medium text-gray-700">Amenities</p>

					{Object.keys(inputs.amenities).map((amenity, index) => (
						<div key={index} className="flex items-center gap-2">
							<input
								checked={inputs.amenities[amenity]}
								type="checkbox"
								className="accent-blue-500 w-4 h-4"
								id={`amenities${index + 1}`}
								onChange={() =>
									setInputs({
										...inputs,
										amenities: {
											...inputs.amenities,
											[amenity]: !inputs.amenities[amenity],
										},
									})
								}
							/>
							<label
								key={index}
								htmlFor={`amenities${index + 1}`}
								className="text-gray-500"
							>
								{amenity}
							</label>
						</div>
					))}
				</div>

				<button
					type="submit"
					className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
				>
					Add Room
				</button>
			</div>
		</form>
	);
};

export default AddRoom;
