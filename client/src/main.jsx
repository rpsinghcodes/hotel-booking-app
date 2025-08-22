import React from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
createRoot(document.getElementById("root")).render(
	<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
		<BrowserRouter>
			<AppProvider>
				<App />
			</AppProvider>
		</BrowserRouter>
	</ClerkProvider>
);
