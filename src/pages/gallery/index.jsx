import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Router, useNavigate, useSearchParams } from "react-router-dom";
import { Loading, Navbar } from "../../components";

const Gallery = () => {
	const [queryParam] = useSearchParams();
	const search = queryParam.get("query");
	const [data, setData] = useState();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getData();
	}, [search]);

	const getData = () => {
		axios
			.get(
				`${process.env.REACT_APP_IMAGE_API}/photos/random?query=${search}&count=20`,
				{
					headers: {
						Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
					},
				}
			)
			.then((response) => {
				setData(response.data);
				setIsLoading(false);
			})
			.catch((error) => {
				setData(error.response);
				setIsLoading(false);
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
		</Fragment>
	);
};

export default Gallery;
