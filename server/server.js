import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import cron from "node-cron";
import userRouter from "./routes/userRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(clerkMiddleware());

cron.schedule("0 * * * *", () => {
	console.log("Running every 1 hour: ", new Date().toLocaleString());
});

// API to listen to clerk webhooks

app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => {
	res.send("API is working");
});

app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("SERVER Running on port", PORT);
});
