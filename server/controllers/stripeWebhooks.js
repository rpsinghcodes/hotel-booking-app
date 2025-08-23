import Stripe from "stripe";
import Booking from "../models/Booking.js";

// API to handle stripe webhooks

export const stripeWebhooks = async (req, res) => {
	const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
	const sig = req.headers["stripe-signature"];
	let event;
	try {
		event = stripeInstance.webhooks.constructEvent(
			req.body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET
		);
	} catch (error) {
		res.status(400).send(`Webhook Error: ${error.message}`);
	}

	if (event.type === "payment_intent.succeeded") {
		const paymentIntent = event.data.object;
		const paymentIntentId = paymentIntent.id;

		// Getting session metadata
		const session = await stripeInstance.checkout.sessions.list({
			payment_intent: paymentIntentId,
		});

		const { bookingId } = session.data[0].metadata;

		// Mark payment as Paid

		await Booking.findByIdAndUpdate(bookingId, {
			isPaid: true,
			paymentMethod: "Stripe",
		});
	} else {
		console.log("unhandled event type: ", event.type);
	}
	res.json({ received: true });
};
