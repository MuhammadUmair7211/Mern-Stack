import { useState } from "react";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const AllRooms = () => {
	const navigate = useNavigate();
	const hotelRooms = roomsDummyData;
	const [openFilter, setOpenFilter] = useState(false);
	const filterGroups = [
		{
			title: "Popular Filters",
			options: ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"],
		},
		{
			title: "Price Range",
			options: ["$0 to 500", "$500 to 1000", "$1000 to 2000", "$2000 to 3000"],
		},
		{
			title: "Sort By",
			options: ["Price Low to High", "Price High to Low", "Newest First"],
		},
	];

	return (
		<div className="flex flex-col-reverse lg:flex-row items-start pt-20 px-4 md:px-16 lg:px-24 xl:px-32">
			{/* LEFT SIDE - Rooms List */}
			<div className="flex-1">
				<div className="mb-8 md:mt-15">
					<h1 className="text-4xl md:text-[35px]">Hotel Rooms</h1>
					<p className="text-sm md:text-base text-gray-500/90 mt-4 max-w-xl">
						Take advantage of our limited-time offers and special packages to
						enhance your stay and create unforgettable memories.
					</p>
				</div>

				{hotelRooms.map((room) => {
					return (
						<div
							key={room._id}
							className="space-y-2 flex flex-col md:flex-row items-start py-8 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
						>
							{/* Room Image */}
							<img
								onClick={() => navigate(`/room-details/${room._id}`)}
								src={room.images[0]}
								alt="room-img"
								title="View Room Details"
								className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
							/>

							{/* Room Details */}
							<div className="md:w-1/2 flex flex-col gap-2">
								<p className="text-gray-500">{room.hotel.city}</p>
								<h1
									className="text-3xl font-semibold cursor-pointer"
									onClick={() => navigate(`/room-details/${room._id}`)}
								>
									{room.hotel.name}
								</h1>
								<p className="text-sm text-gray-500">
									⭐⭐⭐⭐⭐
									<span>200+ reviews</span>
								</p>

								{/* Location */}
								<div className="flex items-center gap-2 text-gray-600">
									<img
										src={assets.locationIcon}
										alt="location-icon"
										className="w-5 h-5"
									/>
									<span>{room.hotel.address}</span>
								</div>

								{/* Amenities */}
								<div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
									{room.amenities.map((items, index) => (
										<div
											key={index}
											className="flex bg-gray-100 px-3 py-2 rounded-lg items-center gap-2 text-gray-600"
										>
											<img
												src={facilityIcons[items]}
												alt={items}
												className="w-5 h-5"
											/>
											<p className="text-xs">{items}</p>
										</div>
									))}
								</div>

								<p className="text-lg font-medium text-gray-700">
									${room.pricePerNight} /night
								</p>
							</div>
						</div>
					);
				})}
			</div>

			<div className="max-w-80 w-full flex-shrink-0 md:mt-30 select-none border border-gray-300">
				{/* Header */}
				<div
					className={`flex items-center justify-between p-3 border-b border-gray-300 ${
						openFilter && "border-b"
					}`}
				>
					<p className="uppercase text-base font-medium text-gray-800">
						Filters
					</p>

					{/* Desktop clear */}
					<span className="text-gray-500 hidden lg:block text-xs font-medium cursor-pointer">
						CLEAR
					</span>

					{/* Mobile toggle */}
					<span
						onClick={() => setOpenFilter(!openFilter)}
						className="text-gray-500 lg:hidden text-xs font-medium cursor-pointer"
					>
						{openFilter ? "HIDE" : "SHOW"}
					</span>
				</div>

				{/* Filter content */}
				<div
					className={`p-6 text-gray-500 transition-all duration-700 overflow-hidden 
		${openFilter ? "h-auto" : "h-0 lg:h-auto"}`}
				>
					{filterGroups.map((group, idx) => (
						<div className="mb-6 flex flex-col gap-2" key={idx}>
							<p className="text-gray-900 font-semibold mb-4">{group.title}</p>
							{group.options.map((label, i) => (
								<div className="flex items-center gap-3" key={i}>
									<input type="checkbox" id={`${group.title}-${i}`} />
									<label
										htmlFor={`${group.title}-${i}`}
										className="text-sm font-light cursor-pointer"
									>
										{label}
									</label>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AllRooms;
