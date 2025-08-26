import React from "react";
import { assets } from "../../assets/assets";

export default function NotFound() {
	return (
		<div className="className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'">
			<img src={assets.pageNotFound} alt='not-found' />
		</div>
	);
}
