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
				setData(response.data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	console.log(data);

	if (isLoading === true) {
		return (
			<Fragment>
				<Loading className="tw-absolute tw-top-1/2 tw-left-1/2 tw-translate-x-[-50%] tw-translate-y-[-50%]" />
			</Fragment>
		);
	}

	return (
		<Fragment>
			<header>
				<Navbar />
			</header>

			<section className="tw-w-screen">
				<HeroSection />
			</section>
			<section className="tw-w-screen tw-my-8">
				<div className="tw-text-center tw-my-5">
					<h1 className="tw-font-bold tw-text-5xl">IMAGES FOR YOU</h1>
				</div>
				<main className="tw-flex tw-justify-center tw-items-center tw-flex-wrap">
					<ImagesGallery data={data} loading={isLoading} />
				</main>
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
			</section>
		</Fragment>
	);
};

export default Home;
