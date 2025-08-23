import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

export default function HotelCard({
	rating,
	location,
	hotelName,
	price,
	_id: id,
	bestSeller = false,
	images = [],
}) {
	return (
		<Link
			to={`/rooms/${id}`}
			key={id}
			className='relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]'
		>
			<img
				src={images[0]}
				alt='hotel-image'
				className='relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] object-cover h-52'
			/>
			{bestSeller ? (
				<p className='px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full'>
					Best Seller
				</p>
			) : null}
			<div className='p-4 pt-5'>
				<div className='flex justify-between'>
					<p className='font-playfair text-xl font-medium text-gray-800'>
						{hotelName}
					</p>
					<div className=' flex items-center gap-1'>
						<img src={assets.starIconFilled} alt='Start Icon' />
						{rating}
					</div>
				</div>
				<div className='flex items-center gap-1 text-sm'>
					<img src={assets.locationIcon} alt='location Icon' />
					{location}
				</div>
				<div className='flex items-center justify-between mt-4'>
					<p className='text-xl text-gray-800'>
						<span className='text-xl text-gray-800'>{price}</span> / night
					</p>
					<div>View Details</div>
				</div>
			</div>
		</Link>
	);
}
