import React from "react";
import Navbar from "./component/Navbar/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./component/Footer/Footer";
import AllRooms from "./pages/AllRooms/AllRooms";
import RoomDetails from "./pages/RoomDetails/RoomDetails";
import MyBooking from "./pages/MyBooking/MyBooking";
import Registration from "./pages/Registration";

export default function App() {
	const isOwnerPath = useLocation().pathname.includes("owner");
	return (
		<>
			{!isOwnerPath && <Navbar />}
			{/* <Hero /> */}
			{false && <Registration />}
			<div className='min-h-[70vh]'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/rooms' element={<AllRooms />} />
					<Route path='/rooms/:id' element={<RoomDetails />} />
					<Route path='/my-bookings' element={<MyBooking />} />
				</Routes>
			</div>
			<Footer />
		</>
	);
}
