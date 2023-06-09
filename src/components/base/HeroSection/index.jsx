import React, { Fragment, useState } from "react";
import { Parallax } from "react-parallax";
import SearchIcon from "@mui/icons-material/Search";
import {
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import nature from "../../../assets/images/nature.jpg";
import axios from "axios";

const HeroSection = ({ heading }) => {
	const [query, setQuery] = useState();
	const navigate = useNavigate();

	const getData = () => {
		axios
			.get(
				`${process.env.REACT_APP_IMAGE_API}/search/photos?query=${query}&page=1&per_page=30`,
				{
					headers: {
						Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
					},
				}
			)
			.then((response) => {
				navigate(`/gallery?query=${query}`);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleSearch = (e) => {
		e.preventDefault();
		getData();
	};

	return (
		<Fragment>
			<Parallax
				strength={600}
				bgImage={nature}
				className="tw-bg-cover tw-bg-center tw-w-full">
				<form onSubmit={(e) => handleSearch(e)}>
					<div className="lg:tw-h-[80vh] sm:tw-h-[50vh] md:tw-h-[60vh] tw-h-[40vh] tw-bg-[#00000087] tw-w-full tw-px-3">
						<div className="tw-h-full">
							<div className="md:tw-w-3/4 tw-w-full tw-relative tw-top-[50%] tw-left-[50%] tw-translate-x-[-50%] tw-translate-y-[-50%]">
								<div className="tw-text-center tw-text-white tw-mb-5">
									<h1 className="tw-font-extrabold tw-text-2xl sm:tw-text-3xl md:tw-text-4xl lg:tw-text-5xl tw-mb-3">
										{heading}
									</h1>
									<p>Search all images you like down here</p>
								</div>
								<FormControl
									variant="outlined"
									fullWidth
									className="tw-flex tw-bg-white tw-rounded-md">
									<InputLabel htmlFor="input-with-icon-adornment">
										Search Image
									</InputLabel>
									<OutlinedInput
										id="input-with-icon-adornment"
										type="text"
										onChange={(e) => setQuery(e.target.value)}
										endAdornment={
											<InputAdornment position="end">
												<SearchIcon
													onClick={(e) => handleSearch(e)}
													className="tw-cursor-pointer"
												/>
											</InputAdornment>
										}
										label="Search Image"
									/>
								</FormControl>
							</div>
						</div>
					</div>
				</form>
			</Parallax>
		</Fragment>
	);
};

export default HeroSection;
