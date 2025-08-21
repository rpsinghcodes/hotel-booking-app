import React from "react";
import Navbar from "./Component/Navbar";
import Sidebar from "./Component/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div className='flex flex-col h-screen'>
			<Navbar />
			<div className='flex h-full '>
				<Sidebar />
				<div className='flex-1 p-4 pt-10 md:px-10 h-full'>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
