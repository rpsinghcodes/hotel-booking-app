import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { messageInRaw } from "svix";

// create room
export const createRoom = async (req, res) => {
	try {
		const { roomType, pricePerNight, amenities } = req.body;
		const hotel = await Hotel.findOne({ owner: req.auth.userId });

		if (!hotel) {
			return res.json({ success: false, message: "Hotel Not found" });
		}

		// upload images to cloudinary
		const uploadImages = req.files.map(async (file) => {
			const response = await cloudinary.uploader.upload(file.path);
			return response.secure_url;
		});

		const images = await Promise.all(uploadImages);

		await Room.create({
			hotel: hotel._id,
			roomType,
			pricePerNight: +pricePerNight,
			amenities: JSON.parse(amenities),
			images,
		});

		return res.json({ success: true, message: "Room create successfully." });
	} catch (error) {
		console.log(error);
		return res.json({ success: false, message: "Something went wrong" });
	}
};

// get room
export const getRooms = async (req, res) => {
	try {
		const rooms = await Room.find({ isAvailable: true })
			.populate({
				path: "hotel",
				populate: {
					path: "owner",
					select: "image",
				},
			})
			.sort({ createdAt: -1 });

		return res.json({ success: true, rooms });
	} catch (error) {
		console.log(error);
		return res.json({ success: false, message: "Something went wrong." });
	}
};

// get specific room
export const getOwnerRooms = async (req, res) => {
	try {
		const hotelData = await Hotel.find({ owner: req.auth.userId });
		const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
			"hotel"
		);

		return res.json({ success: true, rooms });
	} catch (error) {
		console.log(error);
		return res.json({ success: false, message: "Something went wrong." });
	}
};

// toggle Room availability
export const toggleRoomAvailability = async (req, res) => {
	try {
		const { roomId } = req.body;

		const roomData = await Room.findById(roomId);
		roomData.isAvailable = !roomData.isAvailable;
		await roomData.save();
		return res.json({ success: true, message: "Room availability updated." });
	} catch (error) {
		console.log(error);
		return res.json({ success: false, message: "Something went wrong." });
	}
};
