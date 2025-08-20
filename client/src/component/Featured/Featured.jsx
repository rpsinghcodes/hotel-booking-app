import React from "react";
import { roomsDummyData } from "../../assets/assets";
import HotelCard from "../HotelCard/HotelCard";
import Title from "../Title/Title";
import { useNavigate } from "react-router-dom";

export default function Featured() {
	const navigate = useNavigate();
	return (
		<div className='flex flex-col items-start px-6 md:px-16 lg:px-24 xl:px-32'>
			<Title
				title='Featured Hotels'
				subTitle='Discover our handpicked selection of exceptional properties around the
					world, offering unparalleled luxury and unforgettable experiences'
			/>
			<div className='flex flex-wrap gap-6 items-center justify-center mt-20'>
				{roomsDummyData
					.slice(0, 4)
					.map(
						({
							_id,
							rating = 4.9,
							bestSeller = false,
							images,
							hotel: { city, name: hotelName } = {},
							price,
						}) => (
							<HotelCard
								key={_id}
								_id={_id}
								rating={rating}
								location={city}
								hotelName={hotelName}
								bestSeller={bestSeller}
								images={images}
								price={price}
							/>
						)
					)}
			</div>
			<button
				onClick={() => {
					navigate("/rooms");
				}}
				className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'
			>
				View All Destinations
			</button>
		</div>
	);
}
