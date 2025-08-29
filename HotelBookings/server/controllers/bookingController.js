import Bookings from "../models/Bookings.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// function to check availability of room
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
	try {
		const bookings = await Bookings.find({
			checkInDate: { $lte: checkOutDate },
			checkOutDate: { $gte: checkInDate },
			room,
		});
		const isAvailable = bookings.length === 0;
		return isAvailable;
	} catch (error) {
		console.log(error.message);
	}
};

// api to check availability of room

export const checkAvailabilityController = async (req, res) => {
	try {
		const { room, checkInDate, checkOutDate } = req.body;
		const isAvailable = await checkAvailability({
			checkInDate,
			checkOutDate,
			room,
		});
		res.json({ success: true, isAvailable });
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
};

// api to create new booking

export const createBooking = async (req, res) => {
	try {
		const { room, checkInDate, checkOutDate } = req.body;
		const user = req.user._id;
		const isAvailable = await checkAvailability({
			checkInDate,
			checkOutDate,
			room,
		});
		if (!isAvailable) {
			res.json({
				success: false,
				message: "Room is not available for booking",
			});
		}
		const roomData = await Room.findById(room).populate("hotel");
		let totalPrice = roomData.pricePerNight;
		const checkIn = new Date(checkInDate);
		const checkOut = new Date(checkOutDate);
		const timeDiff = checkOut.getTime() - checkIn.getTime();
		const nights = Math.ceil(timeDiff / (1000 * 24 * 60 * 60));
		totalPrice *= nights;
		const booking = await Bookings.create({
			user,
			room,
			hotel: roomData.hotel._id,
			guests: +guests,
			checkInDate,
			checkOutDate,
			totalPrice,
		});
		res.json({
			success: true,
			message: "Booking created successfully",
			booking,
		});
	} catch (error) {
		console.log(error.message);

		res.json({ success: false, message: error.message });
	}
};

// api to get all booking for a user

export const getUserBookings = async (req, res) => {
	try {
		const user = req.user._id;
		const bookings = await Bookings.find({ user })
			.populate("room hotel")
			.sort({ createdAt: -1 });
		res.json({
			success: true,
			bookings,
		});
	} catch (error) {
		console.log(error.message);

		res.json({ success: false, message: error.message });
	}
};

export const getHotelBookings = async (req, res) => {
	try {
		const hotel = await Hotel.findOne({ owner: req.auth.userId });
		if (!hotel) {
			res.json({ success: false, message: "hotel not found" });
		}
		const bookings = await Bookings.find({ hotel: hotel._id })
			.populate("room hotel user")
			.sort({ createdAt: -1 });
		const totalBookings = bookings.length;
		const totalRevenue = bookings.reduce(
			(acc, booking) => acc + booking.totalPrice,
			0
		);
		res.json({
			success: true,
			dashboardData: { bookings, totalBookings, totalRevenue },
		});
	} catch (error) {
		console.log(error.message);
		res.json({ success: false, message: error.message });
	}
};
