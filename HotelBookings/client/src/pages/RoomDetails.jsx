import { useParams } from "react-router-dom";
import {
	assets,
	facilityIcons,
	roomCommonData,
	roomsDummyData,
} from "../assets/assets";
import { useEffect, useState } from "react";

const RoomDetails = () => {
	const [room, setRoom] = useState(null);
	const [mainImage, setMainImage] = useState(null);

	const { id } = useParams();

	useEffect(() => {
		const findRoom = roomsDummyData.find((room) => room._id === id);
		if (findRoom) {
			setRoom(findRoom);
			setMainImage(findRoom.images[0]);
		}
	}, [id]);
	console.log(room);

	return (
		room && (
			<div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32 ">
				<div className="flex items-end flex-wrap gap-2">
					<h1 className="text-3xl">{room.hotel.name}</h1>
					<span className="text-sm">({room.roomType})</span>
					<p className="bg-orange-500 text-white px-4 py-1 rounded-full text-xs">
						20% OFF
					</p>
				</div>
				<p className="my-3">⭐⭐⭐⭐⭐ 200+ reviews</p>

				<p className="flex items-center flex-wrap gap-1 text-gray-500 my-4">
					<img src={assets.locationIcon} alt="" />
					<span>{room.hotel.address}</span>
				</p>

				{/* Images */}
				<div className="flex flex-col md:flex-row items-center gap-4 justify-between">
					<div className="lg:w-1/2 w-full">
						<img
							src={mainImage}
							alt="room-image"
							className="w-full rounded-xl shadow-lg object-cover"
						/>
					</div>
					<div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
						{room?.images.length > 1 &&
							room.images.map((image, index) => (
								<img
									onClick={() => setMainImage(image)}
									key={index}
									src={image}
									alt="rooms"
									className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
										mainImage === image && "outline-3 outline-orange-500"
									}`}
								/>
							))}
					</div>
				</div>

				<div className="flex mt-10 items-center flex-wrap justify-between">
					<h1 className="text-3xl">Experience Luxury Like Never Before</h1>
					<p className="text-2xl font-semibold">${room.pricePerNight}/night</p>
				</div>

				{/* Amenities */}
				<div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
					{room.amenities.map((items, index) => (
						<div
							key={index}
							className="flex bg-gray-100 px-3 py-2 rounded-lg items-center gap-2 text-gray-600"
						>
							<img src={facilityIcons[items]} alt={items} className="w-5 h-5" />
							<p className="text-xs">{items}</p>
						</div>
					))}
				</div>
				<form className="flex flex-wrap justify-between items-end gap-4 bg-white shadow-[0_0_5px_0] text-gray-600 p-8 mt-20 mb-10 rounded-lg">
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
							required
							className="outline-none rounded border border-gray-200 mt-1.5 px-3 py-1.5 w-16"
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-600 max-w-md w-full text-white hover:bg-blue-800 duration-300 cursor-pointer flex items-center justify-center rounded-lg px-4 py-2"
					>
						<img src={assets.searchIcon} alt="search" />
						Search
					</button>
				</form>

				<section className="my-20">
					<div className="my-10 pb-10 border-b border-gray-300 max-w-3xl flex flex-col items-start gap-4">
						{roomCommonData.map((data, index) => {
							return (
								<div key={index} className="flex items-start gap-2">
									<div>
										<img src={data.icon} alt="" />
									</div>
									<div>
										<h2>{data.title}</h2>
										<p className="text-gray-500">{data.description}</p>
									</div>
								</div>
							);
						})}
					</div>
					<p className="pb-10 my-10 text-gray-500 border-b border-gray-300 max-w-3xl">
						Guests will be allocated on the ground floor according to
						availability. You get a comfortable Two bedroom apartment has a true
						city feeling. The price quoted is for two guest, at the guest slot
						please mark the number of guests to get the exact price for groups.
						The Guests will be allocated ground floor according to availability.
						You get the comfortable two bedroom apartment that has a true city
						feeling.
					</p>
				</section>
				<div className="flex flex-col items-start gap-4">
					<div className="flex gap-4">
						<img
							src={room.hotel.owner.image}
							alt="host"
							className="h-14 w-14 md:h-18 md:w-18 rounded-full"
						/>
						<div>
							<p>Hosted by {room.hotel.name}</p>
							<div>
								⭐⭐⭐⭐
								<p>200+ reviews</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default RoomDetails;
