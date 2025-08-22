// GET /api/user

export const getUserData = async (req, res) => {
	try {
		const { recentSearchCities, role } = req.user;
		return res.json({ success: true, role, recentSearchCities });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};

export const storeRecentSearchedCities = async (req, res) => {
	try {
		const { recentSearchCities } = req.body;
		const user = await req.user;

		if (user.recentSearchCities < 3) {
			user.recentSearchCities.push(recentSearchCities);
		} else {
			user.recentSearchCities.shift();
			user.recentSearchCities.push(recentSearchCities);
		}

		await user.save();

		return res.json({ success: true, message: "City added" });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};
