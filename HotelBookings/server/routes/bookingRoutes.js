import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
	createBooking,
	getHotelBookings,
	getUserBookings,
	checkAvailabilityController,
} from "../controllers/bookingController.js";
const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityController);
bookingRouter.post("/book", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/hotel", protect, getHotelBookings);

export default bookingRouter;
