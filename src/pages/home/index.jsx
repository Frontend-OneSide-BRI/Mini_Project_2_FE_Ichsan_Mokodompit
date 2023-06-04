import React, { Fragment, useEffect, useState } from "react";
import {
	Navbar,
	ImagesGallery,
	Buttons,
	Loading,
	HeroSection,
} from "../../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const [data, setData] = useState();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		axios
			.get(`${process.env.REACT_APP_IMAGE_API}/photos/random?count=10`, {
				headers: {
					Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
				},
			})
			.then((response) => {
				setData(response);
				setIsLoading(false);
				setIsError(false);
			})
			.catch((error) => {
				setIsLoading(false);
				setIsError(true);
				setData(error.response);
			});
	};

	if (isLoading === true) {
		return (
			<Fragment>
				<Loading className="tw-absolute tw-top-1/2 tw-left-1/2 tw-translate-x-[-50%] tw-translate-y-[-50%]" />
			</Fragment>
		);
	}

	return (
		<Fragment>
			{/* Navbar Start */}
			<header>
				<Navbar />
			</header>
			{/* Navbar End */}

			{/* Hero Start */}
			<section className="tw-w-screen">
				<HeroSection heading={"WELCOME TO IMAGE GALLERY"} />
			</section>
			{/* Hero End */}

			{/* Main Component Start */}
			<main className="tw-w-screen tw-my-8">
				<div className="tw-text-center tw-my-10">
					<h1 className="tw-font-bold tw-text-5xl">IMAGES FOR YOU</h1>
				</div>

				{/* Show Image Gallery */}
				<section className="tw-flex tw-justify-center tw-items-center tw-flex-wrap">
					{isError === true ? (
						<h2 className="tw-font-bold tw-text-5xl">
							Sorry, <span>{data.data}</span>
						</h2>
					) : (
						<ImagesGallery data={data.data} />
					)}
				</section>
				{/* Show Image Gallery End */}

				<div className="tw-flex tw-justify-center tw-items-center tw-w-full">
					<Buttons
						type={"button"}
						className={
							"tw-w-full md:tw-w-4/6 lg:tw-w-2/6 tw-h-16 tw-bg-slate-400 tw-items-center tw-m-3 tw-rounded-md tw-text-xl tw-font-extrabold tw-text-white tw-shadow-lg hover:tw-bg-slate-600 tw-transition-all"
						}
						text={"See More"}
						onClick={() => navigate("/gallery")}
					/>
				</div>
			</main>
			{/* Main Component End */}
		</Fragment>
	);
};

export default Home;
