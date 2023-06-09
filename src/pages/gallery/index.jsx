import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	Buttons,
	HeroSection,
	ImagesGallery,
	Loading,
	Navbar,
} from "../../components";
import { Pagination, Stack } from "@mui/material";

const Gallery = () => {
	const [queryParam] = useSearchParams();
	const search = queryParam.get("query");
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [page, setPage] = useState(1);
	const [imageLoading, setImageLoading] = useState(false);
	const backTotop = () => {
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		if (search) {
			setIsLoading(true);
			getSearchData();
			setPage(1);
		} else {
			setIsLoading(true);
			getAllImage();
		}
	}, [search]);

	const getAllImage = () => {
		axios
			.get(`${process.env.REACT_APP_IMAGE_API}/photos/random?count=30`, {
				headers: {
					Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
				},
			})
			.then((response) => {
				setData(response);
				setIsLoading(false);
			})
			.catch((error) => {
				setData(error.response);
				setIsLoading(false);
				setIsError(true);
			});
	};

	const getSearchData = (page) => {
		axios
			.get(
				`${process.env.REACT_APP_IMAGE_API}/search/photos?query=${search}&page=${page}&per_page=30`,
				{
					headers: {
						Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
					},
				}
			)
			.then((response) => {
				setData(response);
				setIsLoading(false);
				setImageLoading(false);
			})
			.catch((error) => {
				setImageLoading(false);
				setData(error.response);
				setIsLoading(false);
				setIsError(true);
			});
	};

	const handlePage = (event, value) => {
		setPage(value);
		getSearchData(value);
		setImageLoading(true);
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
			{/* Navbar etart */}
			<header>
				<Navbar />
			</header>
			{/* Navbar end */}

			{/* Hero section start */}
			<section className="tw-w-screen">
				<HeroSection
					heading={
						search
							? `You're looking for ${search}`
							: "STUNNING IMAGES JUST FOR YOU"
					}
				/>
			</section>
			{/* Hero section end */}

			{/* Main component start */}
			<main className="tw-w-screen tw-my-8">
				<section className="tw-flex tw-justify-center tw-items-center tw-flex-wrap">
					{isError === true || data.data.total === 0 ? (
						<h2 className="tw-font-bold tw-text-5xl">Sorry, data not found</h2>
					) : (
						<ImagesGallery
							data={search ? data.data.results : data.data}
							loading={imageLoading}
						/>
					)}
				</section>
				{search ? (
					<div className="tw-relative tw-w-full tw-flex tw-my-10 tw-justify-center tw-items-center">
						<Stack spacing={2}>
							<Pagination
								count={data.data.total_pages}
								size="large"
								page={page}
								boundaryCount={2}
								onChange={handlePage}
							/>
						</Stack>
					</div>
				) : (
					<></>
				)}

				{search || isError === true ? (
					<></>
				) : (
					<div className="tw-flex tw-justify-center tw-items-center tw-w-full">
						<Buttons
							type={"button"}
							className={
								"tw-w-full md:tw-w-4/6 lg:tw-w-2/6 tw-h-16 tw-bg-slate-400 tw-items-center tw-m-3 tw-rounded-md tw-text-xl tw-font-extrabold tw-text-white tw-shadow-lg hover:tw-bg-slate-600 tw-transition-all"
							}
							text={"Wants To See More? Go Search It!!!"}
							onClick={backTotop}
						/>
					</div>
				)}
			</main>
			{/* Main component end */}
		</Fragment>
	);
};

export default Gallery;
