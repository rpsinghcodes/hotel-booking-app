import React, { useEffect, useState } from "react";
// import { roomsDummyData } from "../../assets/assets";
import HotelCard from "../HotelCard/HotelCard";
import Title from "../Title/Title";
import { useAppContext } from "../../context/AppContext";

export default function RecommendedHotels() {
	const { rooms, searchedCities = [] } = useAppContext();

	const [recommended, setRecommended] = useState([]);
	const filteredHotels = () => {
		const filteredHotel = rooms
			.slice()
			.filter((room) => searchedCities.includes(room.hotel.city));
		setRecommended(filteredHotel);
	};

	useEffect(() => {
		filteredHotels();
	}, [rooms]);
	return (
		recommended.length > 0 && (
			<div className='flex flex-col items-center px-6 md:px-16 lg:px-24 py-20 bg-slate-50'>
				<Title
					title='Recommended Hotels'
					subTitle='Discover our handpicked selection of exceptional properties around the
					world, offering unparalleled luxury and unforgettable experiences'
				/>
				<div className='flex flex-wrap gap-6 items-center justify-center mt-20'>
					{rooms
						.slice(0, 4)
						.map(
							({
								_id,
								rating = 4.9,
								bestSeller = false,
								images,
								hotel: { city, name: hotelName } = {},
								pricePerNight,
							}) => (
								<HotelCard
									key={_id}
									_id={_id}
									rating={rating}
									location={city}
									hotelName={hotelName}
									bestSeller={bestSeller}
									images={images}
									price={pricePerNight}
								/>
							)
						)}
				</div>
			</div>
		)
	);
}
