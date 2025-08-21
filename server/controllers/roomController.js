import Hotel from "../models/Hotel.js";

// create room
export const createRoom = async (req, res) => {
    try {
        const {roomType, pricePerNight, amenities} = req.body;
        const hotel = await Hotel.findOne({owner: req.auth.userId});

        if(!hotel) {
            return res.json({success: false, message: 'Hotel Not found'})
        }
    } catch (error) {
        
    }
};

// get room
export const getRooms = async (req, res) => {};

// get specific room
export const getOwnerRooms = async (req, res) => {};

// toggle Room availability
export const toggleRoomAvailability = async (req, res) => {};
