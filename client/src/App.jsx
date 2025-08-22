import React from "react";
import Navbar from "./component/Navbar/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./component/Footer/Footer";
import AllRooms from "./pages/AllRooms/AllRooms";
import RoomDetails from "./pages/RoomDetails/RoomDetails";
import MyBooking from "./pages/MyBooking/MyBooking";
import Registration from "./pages/Registration";
import Layout from "./pages/Admin/Layout";
import Dashboard from "./pages/Admin/Component/Dashboard";
import AddRoom from "./pages/Admin/Component/AddRoom";
import ListRoom from "./pages/Admin/Component/ListRoom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

export default function App() {
	const isOwnerPath = useLocation().pathname.includes("owner");
	const { showHotelReg } = useAppContext();
	return (
		<div>
			<Toaster />
			{!isOwnerPath && <Navbar />}
			{showHotelReg && <Registration />}
			<div className='min-h-[70vh]'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/rooms' element={<AllRooms />} />
					<Route path='/rooms/:id' element={<RoomDetails />} />
					<Route path='/my-bookings' element={<MyBooking />} />
					<Route path='/owner' element={<Layout />}>
						<Route index element={<Dashboard />} />
						<Route path='add-room' element={<AddRoom />} />
						<Route path='list-room' element={<ListRoom />} />
					</Route>
				</Routes>
			</div>
			<Footer />
		</div>
	);
}
