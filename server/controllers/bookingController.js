// Check room is Availability of Room

import Stripe from "stripe";
import transporter from "../configs/nodemailer.js";
import { throwError } from "../helper/utils.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
	try {
		const bookings = await Booking.find({
			room,
			checkInDate: { $lte: checkOutDate },
			checkOutDate: { $gte: checkInDate },
		});

		return bookings.length === 0;
	} catch (error) {
		console.log(error);
	}
};

// POST /api/
export const checkAvailabilityAPI = async (req, res) => {
	try {
		const { room, checkInDate, checkOutDate } = req.body;
		const isAvailable = checkAvailability({ room, checkInDate, checkOutDate });
		return res.json({ success: true, isAvailable });
	} catch (error) {
		return throwError(error, res);
	}
};

export const createBooking = async (req, res) => {
	try {
		const { room, checkInDate, checkOutDate, guests } = req.body;
		const user = req.user._id;
		const isAvailable = await checkAvailability({
			room,
			checkInDate,
			checkOutDate,
		});
		if (!isAvailable) {
			return res.json({ success: false, message: "Room is not available" });
		}

		const roomData = await Room.findById(room).populate("hotel");
		let totalPrice = roomData.pricePerNight;

		// calculate totalPrice based on night
		const checkIn = new Date(checkInDate);
		const checkOut = new Date(checkOutDate);

		const timeDiff = checkOut.getTime() - checkIn.getTime();
		const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

		totalPrice *= nights;
		const booking = await Booking.create({
			user,
			room,
			hotel: roomData.hotel._id,
			guests: +guests,
			checkInDate,
			checkOutDate,
			totalPrice,
		});

		const mailOptions = {
			from: process.env.NODE_MAILER_EMAIL,
			to: req.user.email,
			subject: "Hotel Booking Details",
			html: `
				<h2>Your Booking Details</h2>
				<p>Dear ${req.user.username}, </p>
				<p>Thank you for your booking! Here are your details: </p>
				<ul>
				<li><strong>Booking ID: </strong> ${booking._id}</li>
				<li><strong>Hotel Name: </strong> ${roomData.hotel.name}</li>
				<li><strong>Location: </strong> ${roomData.hotel.address}</li>
				<li><strong>Date: </strong> ${booking.checkInDate.toDateString()}</li>
				<li><strong>Booking Amount: </strong> ${booking.totalPrice}$ /  night</li>
				<p>We look forward to welcome you!</p>
				<p>If you need to make any changes, feel free to contact us.</p>
				</ul>
			`,
		};

		await transporter.sendMail(mailOptions);

		return res.json({ success: true, message: "Booking created successfully" });
	} catch (error) {
		return throwError(error, res, "Failed to create booking");
	}
};

// API to get all booking for a user;
// Get api/bookings/user

export const getUserBookings = async (req, res) => {
	try {
		const user = req.user._id;

		const bookings = await Booking.find({ user })
			.populate("room hotel")
			.sort({ createdAt: -1 });
		return res.json({ success: true, bookings });
	} catch (error) {
		return throwError(error, res, "Failed to fetch bookings");
	}
};

export const getHotelBookings = async (req, res) => {
	try {
		const hotel = await Hotel.findOne({ owner: req.auth.userId });
		if (!hotel) {
			return res.json({ success: false, message: "No Hotel found" });
		}

		const bookings = await Booking.find({ hotel: hotel._id })
			.populate("room hotel user")
			.sort({ createdAt: -1 });

		const totalBookings = bookings.length;

		const totalRevenue = bookings.reduce((acc, booking) => {
			return acc + booking.totalPrice;
		}, 0);

		return res.json({
			success: true,
			dashboardData: { totalBookings, totalRevenue, bookings },
		});
	} catch (error) {
		return throwError(error, res, "Failed to fetch bookings");
	}
};

export const stripePayment = async (req, res) => {
	try {
		const { bookingId } = req.body;
		const booking = await Booking.findById(bookingId);
		const roomData = await Room.findById(booking.room).populate("hotel");

		const { totalPrice } = booking;
		const { origin } = req.headers;

		const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

		const line_items = [
			{
				price_data: {
					currency: "usd",
					product_data: {
						name: roomData.hotel.name,
					},
					unit_amount: totalPrice * 100,
				},
				quantity: 1,
			},
		];
		// create checkout sessions

		const session = await stripeInstance.checkout.sessions.create({
			line_items,
			mode: "payment",
			success_url: `${origin}/loader/my-bookings`,
			cancel_url: `${origin}/loader/my-bookings`,
			metadata: {
				bookingId,
			},
		});

		return res.json({ success: true, url: session.url });
	} catch (error) {
		return throwError(error, res, "Payment failed");
	}
};
