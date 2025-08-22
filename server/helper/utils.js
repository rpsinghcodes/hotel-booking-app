export const throwError = (error, res, message = "Something went wrong") => {
	console.log(error);
	return res.status(500).json({ success: false, message });
};
