import React, { Fragment, useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import {
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material";

const HeroSection = () => {
	const [image, setImage] = useState();

	useEffect(() => {
		getData();
	}, []);
	const getData = () => {
		axios
			.get(`${process.env.REACT_APP_IMAGE_API}/photos/P3gCxHrE60Q`, {
				headers: {
					Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
				},
			})
			.then((response) => {
				setImage(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<Fragment>
			{image === undefined ? (
				<></>
			) : (
				<Parallax
					strength={600}
					bgImage={image.urls.regular}
					className="tw-bg-cover tw-bg-center tw-w-full">
					<div className="lg:tw-h-[80vh] sm:tw-h-[50vh] md:tw-h-[60vh] tw-h-[40vh] tw-bg-[#00000087] tw-w-full tw-px-3">
						<form className="tw-h-full">
							<div className="md:tw-w-3/4 tw-w-full tw-relative tw-top-[50%] tw-left-[50%] tw-translate-x-[-50%] tw-translate-y-[-50%]">
								<div className="tw-text-center tw-text-white tw-mb-5">
									<h1 className="tw-font-extrabold tw-text-2xl sm:tw-text-3xl md:tw-text-4xl lg:tw-text-5xl tw-mb-3">
										WELCOME TO PHOTO GALLERY
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
										// onChange={(e) => setTitle(e.target.value)}
										endAdornment={
											<InputAdornment position="end">
												<SearchIcon
													// onClick={}
													className="tw-cursor-pointer"
												/>
											</InputAdornment>
										}
										label="Search Image"
									/>
								</FormControl>
							</div>
						</form>
					</div>
				</Parallax>
			)}
		</Fragment>
	);
};

export default HeroSection;
