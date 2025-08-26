import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import cron from "node-cron";
import userRouter from "./routes/userRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";
import Awake from "./models/Awake.js";

connectDB();
connectCloudinary();

const app = express();

app.use(cors());

// API to listen to stripe webhooks
app.post(
	"/api/stripe",
	express.raw({ type: "application/json" }),
	stripeWebhooks
);

app.use(express.json());
app.use(clerkMiddleware());

cron.schedule("*/14 * * * *", async () => {
	const awakeTime = new Date().toLocaleString();
	console.log("Running every 14 minute: ", awakeTime);
	// keep my mongodb always on
	await Awake.create({ awakeTime });
});

// API to listen to clerk webhooks

app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => {
	res.send("API is working");
});

app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("SERVER Running on port", PORT);
});
