import React from "react";
import Hero from "../../component/Hero/Hero";
import Featured from "../../component/Featured/Featured";
import ExclusiveOffers from "../../component/ExclusiveOffers/ExclusiveOffers";
import Testimonial from "../../component/Testimonial/Testimonial";
import NewsLetter from "../../component/NewsLetter/NewsLetter";
export default function Home() {
	return (
		<>
			<Hero />
			<Featured />
			<ExclusiveOffers />
			<Testimonial />
			<NewsLetter />			
		</>
	);
}
