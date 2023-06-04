import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HeroSection, ImagesGallery, Loading, Navbar } from "../../components";
import { Pagination, Stack } from "@mui/material";

const Gallery = () => {
	const [queryParam] = useSearchParams();
	const search = queryParam.get("query");
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [page, setPage] = useState(1);
	const [imageLoading, setImageLoading] = useState(false);

	useEffect(() => {
		if (search) {
			setIsLoading(true);
			getSearchData();
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
				console.log(response);
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
					{isError === true ? (
						<h2 className="tw-font-bold tw-text-5xl">
							Sorry, <span>{data.data}</span>
						</h2>
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
			</main>
			{/* Main component end */}
		</Fragment>
	);
};

export default Gallery;
