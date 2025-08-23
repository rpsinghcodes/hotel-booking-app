import React from "react";
import { assets, facilityIcons } from "../../assets/assets";
import StarRating from "../../component/StarRating/StarRating";
import { useSearchParams } from "react-router-dom";
import Filter from "../../component/Filter/Filter";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";
import { useMemo } from "react";

export default function AllRooms() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { rooms, navigate } = useAppContext();
	const [selectedFilters, setSelectedFilters] = useState({
		roomType: [],
		priceRange: [],
	});
	const [selectedSort, setSelectedSort] = useState("");

	const handleFilterChange = (checked, value, type) => {
		setSelectedFilters((prevFilters) => {
			const updatedFilters = { ...prevFilters };
			if (checked) {
				updatedFilters[type].push(value);
			} else {
				updatedFilters[type] = updatedFilters[type].filter(
					(item) => item !== value
				);
			}

			return updatedFilters;
		});
	};

	const handleSortChange = (sortOption) => {
		setSelectedSort(sortOption);
	};

	const matchesRoomType = (room) => {
		return (
			selectedFilters.roomType.length === 0 ||
			selectedFilters.roomType.includes(room.roomType)
		);
	};

	// Function to check if a room matches the selected price ranges
	const matchesPriceRange = (room) => {
		return (
			selectedFilters.priceRange.length === 0 ||
			selectedFilters.priceRange.some((range) => {
				const [min, max] = range.split(" to ").map(Number);
				console.log({ min, max });
				return room.pricePerNight >= min && room.pricePerNight <= max;
			})
		);
	};

	const sortRooms = (a, b) => {
		if (selectedSort === "Price Low to High") {
			return a.pricePerNight - b.pricePerNight;
		}
		if (selectedSort === "Price High to Low") {
			return b.pricePerNight - a.pricePerNight;
		}

		if (selectedSort === "Newest") {
			return new Date(b.createdAt) - new Date(a.createdAt);
		}

		return 0;
	};

	// Filter Destination

	const filterDestination = (room) => {
		const destination = searchParams.get("destination");
		if (!destination) return true;
		return room.hotel.city
			.toLowerCase()
			.includes(destination.toLocaleLowerCase());
	};

	// Filter and sort rooms based on the selected filters and sort options

	const filteredRooms = useMemo(() => {
		return rooms
			.filter(
				(room) =>
					matchesRoomType(room) &&
					matchesPriceRange(room) &&
					filterDestination(room)
			)
			.sort(sortRooms);
	}, [rooms, selectedFilters, selectedSort, searchParams]);

	// clear all Filter

	const clearFilters = () => {
		setSelectedFilters({
			roomType: [],
			priceRange: [],
		});
		setSelectedSort("");
		setSearchParams({});
	};

	return (
		<div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
			<div>
				<h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
				<p className='text-sm md:text-basea text-gray-500/90 mt-2'>
					Take advantage of our limited-time offers and special packages to
					enhance your stay and create unforgettable memories.
				</p>

				{filteredRooms.map((room) => (
					<div
						key={room._id}
						className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0 '
					>
						<img
							src={room.images[0]}
							alt='hotel-image'
							title='View Room Details'
							className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer'
							onClick={() => {
								navigate(`/rooms/${room._id}`);
								scroll(0, 0);
							}}
						/>
						<div className='md:w-1/2 flex flex-col gap-2 ml-9'>
							<p className='text-gray-500'>{room.hotel.city}</p>
							<p className='text-gray-800 text-3xl font-playfair cursor-pointer'>
								{room.hotel.name}
							</p>
							<div className='flex items-center'>
								<StarRating />
								<span className='ml-2'>200+ reviews</span>
							</div>
							<div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
								<img src={assets.locationIcon} alt='location-icon' />
								{room.hotel.address}
							</div>
							{/* Room Amenities */}
							<div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
								{room.amenities.map((item) => (
									<div
										key={item}
										className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'
									>
										<img
											src={facilityIcons[item]}
											alt={item}
											className='w-5 h-5'
										/>
										<p className='text-xs'>{item}</p>
									</div>
								))}
							</div>
							{/* Room Price per Night */}
							<p className='text-xl font-medium text-gray-700'>
								${room.pricePerNight} /night
							</p>
						</div>
					</div>
				))}
			</div>
			{/* Filters */}
			<Filter
				selectedFilters={selectedFilters}
				handleFilterChange={handleFilterChange}
				selectedSort={selectedSort}
				onSortChange={handleSortChange}
				onClearFilter={clearFilters}
			/>
		</div>
	);
}
