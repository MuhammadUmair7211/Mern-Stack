import { assets, roomsDummyData } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import Title from "../components/Title";
const FeaturedDestination = () => {
	const hotels = roomsDummyData;
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center text-center bg-slate-50 px-6 md:px-16 lg:px-24 xl:px-32">
			<Title
				title="Featured Destination"
				subtitle="Discover our handpicked selection of exceptional properties around the
				world, offering unparalleled luxury and unforgettable experiences."
			/>
			<div className="flex flex-wrap items-center justify-center gap-6 mt-10">
				{hotels.map((hotel) => {
					return (
						<Link key={hotel._id} to={`/room-details/${hotel._id}`}>
							<div className="max-w-md rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200">
								{/* Image */}
								<img
									className="w-full h-48 object-cover"
									src={hotel.images[0]}
									alt="Hotel Room"
								/>

								{/* Content */}
								<div className="p-5">
									{/* Rating */}
									<div className="flex items-center justify-between mb-3">
										<h2 className="text-xl font-semibold mb-2">
											{hotel.hotel.name}
										</h2>
										<div className="flex items-center">
											<svg
												className="w-5 h-5 text-yellow-400"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.785.57-1.84-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.967z" />
											</svg>
											<span className="ml-2 text-gray-600 text-sm">4.8/5</span>
										</div>
									</div>

									{/* Description */}
									<p className="text-gray-700 mb-4 text-sm flex items-center gap-1">
										<img src={assets.locationIcon} alt="location" />
										{hotel.hotel.address}
									</p>

									<div className="flex items-center justify-between">
										<p className="text-sm text-gray-700">
											${hotel.pricePerNight}/night
										</p>
										{/* Book Now Button */}
										<button className="py-2 px-4 border border-gray-400 cursor-pointer hover:bg-gray-200 duration-300 rounded-lg">
											Book Now
										</button>
									</div>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
			<button
				onClick={() => navigate("/rooms")}
				className="border border-gray-200 my-24 hover:bg-gray-100 cursor-pointer px-4 py-2"
			>
				View All Destinations
			</button>
		</div>
	);
};

export default FeaturedDestination;
