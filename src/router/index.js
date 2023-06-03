import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Gallery from "../pages/gallery";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<Home />} />
					<Route path="gallery" element={<Gallery />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
