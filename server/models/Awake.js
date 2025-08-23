import mongoose from "mongoose";

const awakeSchema = mongoose.Schema(
	{
		awakeTime: { type: Date, required: true },
	},
	{ timestamps: true }
);

const Awake = mongoose.model("Awake", awakeSchema);

export default Awake;
