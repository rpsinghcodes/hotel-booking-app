// GET /api/user

export const getUserData = async (req, res) => {
	try {
		const { recentSearchCities, role } = req.user;
		res.json({ success: true, role, recentSearchCities });
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
};
