import express from "express";
import { registerHotel } from "../controllers/hotelController.js";
import { protect } from "../middleware/authMiddleware.js";

const hotelRoutes = express.Router();

hotelRoutes.post("/", protect, registerHotel);

export default hotelRoutes;
