import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_ENDPOINT;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const currency = import.meta.env.VITE_CURRENCY || "$";

	const navigate = useNavigate();
	const { user } = useUser();
	const { getToken } = useAuth();

	const [isOwner, setIsOwner] = useState(false);
	const [showHotelReg, setShowHotelReg] = useState(true);
	const [searchedCities, setSearchedCities] = useState([]);

	const fetchUser = async () => {
		try {
			const { data } = await axios.get("/api/user", {
				headers: { Authorization: `Bearer ${await getToken()}` },
			});
			if (data.success) {
				setIsOwner(data.role === "owner");
				setSearchedCities(data.recentSearchedCities);
			} else {
				// Retry Fetchhing user Details;
				setTimeout(() => {
					fetchUser();
				}, 5000);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		fetchUser();
	}, [user]);

	const value = {
		currency,
		navigate,
		user,
		getToken,
		isOwner,
		setIsOwner,
		axios,
		showHotelReg,
		setShowHotelReg,
		searchedCities,
		setSearchedCities,
	};
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
