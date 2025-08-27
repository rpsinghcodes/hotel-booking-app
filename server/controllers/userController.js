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
		const { recentSearchedCity } = req.body;
		const user = await req.user;

		if (user.recentSearchedCities < 3) {
			user.recentSearchedCities.push(recentSearchedCity);
		} else {
			user.recentSearchedCities.shift();
			user.recentSearchedCities.push(recentSearchedCity);
		}

		await user.save();

		return res.json({ success: true, message: "City added" });
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
};
