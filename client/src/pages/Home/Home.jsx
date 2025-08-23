import React from "react";
import Hero from "../../component/Hero/Hero";
import Featured from "../../component/Featured/Featured";
import ExclusiveOffers from "../../component/ExclusiveOffers/ExclusiveOffers";
import Testimonial from "../../component/Testimonial/Testimonial";
import NewsLetter from "../../component/NewsLetter/NewsLetter";
import RecommendedHotels from "../../component/RecommendedHotels/RecommendedHotels";
export default function Home() {
	return (
		<>
			<Hero />
			<RecommendedHotels />
			<Featured />
			<ExclusiveOffers />
			<Testimonial />
			<NewsLetter />
		</>
	);
}
