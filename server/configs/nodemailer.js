import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.email",
	port: 587,
	secure: true,
	auth: {
		user: process.env.NODE_MAILER_EMAIL,
		pass: process.env.NODE_MAILER_PASS,
	},
});

export default transporter;
