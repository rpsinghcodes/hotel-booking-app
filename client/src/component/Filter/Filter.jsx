import React, { useState } from "react";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
	return (
		<label
			htmlFor=''
			className='flex gap-3 items-center cursor-pointer mt-2 text-sm'
		>
			<input
				type='checkbox'
				checked={selected}
				onChange={(e) => onChange(e.target.checked, label)}
			/>
			<span className='font-light select-none'>{label}</span>
		</label>
	);
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
	return (
		<label
			htmlFor=''
			className='flex gap-3 items-center cursor-pointer mt-2 text-sm'
		>
			<input
				type='radio'
				name='sortOption'
				checked={selected}
				onChange={() => onChange(label)}
			/>
			<span className='font-light select-none'>{label}</span>
		</label>
	);
};

const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
const priceRanges = ["0 to 500", "500 to 1000", "1000 to 2000", "2000 to 3000"];
const sortOptions = ["Price Low to High", "Price High to Low", "Newest First"];

export default function Filter() {
	const [openFilter, setOpenFilter] = useState(false);
	const [checked, setChecked] = useState({
		roomTypes: [],
		priceRanges: [],
		sort: "",
	});

	const handleChecked = (type, value) => {
		setChecked((prev) => ({
			...prev,
			[type]: [type][value]
				? [type].filter((val) => val !== value)
				: [type].push(value),
		}));
	};
	return (
		<div className='bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16'>
			<div
				className={`flex justify-between items-center px-5 py-2.5 min-lg:border-b border-gray-300 ${
					openFilter && "border-b"
				}`}
			>
				<p className='text-base font-medium text-gray-800'>FILTERS</p>
				<div className='text-xs cursor-pointer'>
					<span
						className='lg:hidden'
						onClick={() => setOpenFilter(!openFilter)}
					>
						{openFilter ? "HIDE" : "SHOW"}
					</span>
					<span className='hidden lg:block'>CLEAR</span>
				</div>
			</div>
			<div
				className={`${
					openFilter ? "h-auto" : "h-0 lg:h-auto"
				} overflow-hidden transition-all duration-700`}
			>
				<div className='px-5 pt-5 '>
					<p className='font-medium text-gray-800 pb-2'>Popular filters</p>
					{roomTypes.map((room) => (
						<CheckBox
							label={room}
							key={room}
							onChange={() => handleChecked("roomTypes", room)}
							selected={checked[room]}
						/>
					))}
				</div>
				<div className='px-5 pt-5 '>
					<p className='font-medium text-gray-800 pb-2'>Price</p>
					{priceRanges.map((range) => (
						<CheckBox
							label={` $ ${range}`}
							key={range}
							onChange={() => handleChecked("priceRanges", range)}
							selected={checked[range]}
						/>
					))}
				</div>
				<div className='px-5 pt-5 pb-7'>
					<p className='font-medium text-gray-800 pb-2'>Sort By</p>
					{sortOptions.map((option) => (
						<RadioButton
							label={option}
							key={option}
							onChange={() => handleChecked("sortOption", option)}
							selected={checked[sortOptions]}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
