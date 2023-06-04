import React, { Fragment, useState } from "react";
import style from "../../../assets/styles/Component.module.css";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const ImagesGallery = ({ data }) => {
	const [model, setModel] = useState(false);
	const [tempImgSrc, setTempImgSrc] = useState("");
	const [imgIndex, setImgIndex] = useState();

	const getImg = (imgSrc, index) => {
		setTempImgSrc(imgSrc);
		setModel(true);
		setImgIndex(index);
	};

	const closeImage = () => {
		setModel(false);
		setTempImgSrc("");
	};

	const nextImage = (imgSrc) => {
		setTempImgSrc(imgSrc);
		setImgIndex(imgIndex + 1);
	};

	const prevImage = (imgSrc) => {
		setTempImgSrc(imgSrc);
		setImgIndex(imgIndex - 1);
	};

	const mapping = () => {
		if (data === undefined) {
			return <></>;
		} else {
			return data.map((item, index) => (
				<div
					className={`tw-relative tw-w-[400px] tw-h-[500px] tw-m-[5px] tw-block tw-rounded-md tw-overflow-hidden tw-shadow-2xl ${style.parent}`}
					key={index}>
					<img
						src={item.urls.regular}
						alt={item.description}
						className={`tw-relative tw-top-0 tw-left-0 tw-w-full tw-h-full tw-object-cover tw-shadow-2xl tw-rounded-md ${style.child} tw-cursor-pointer`}
						onClick={() => getImg(item.urls.regular, index)}
					/>
				</div>
			));
		}
	};

	return (
		<Fragment>
			<div
				className={model ? `${style.model} ${style.open}` : `${style.model}`}>
				<ArrowBackIosNewIcon
					className={
						imgIndex === 0 ? `${style.prevIcon} tw-hidden` : `${style.prevIcon}`
					}
					onClick={() => prevImage(data[imgIndex - 1].urls.regular)}
				/>

				<img
					src={tempImgSrc}
					alt=""
					className={`${style.images} tw-rounded-lg`}
				/>
				<CloseIcon className={style.clsIcon} onClick={closeImage} />

				<ArrowForwardIosIcon
					className={
						imgIndex === data.length - 1
							? `${style.nextIcon} tw-hidden`
							: `${style.nextIcon}`
					}
					onClick={() => nextImage(data[imgIndex + 1].urls.regular)}
				/>
			</div>
			{mapping()}
		</Fragment>
	);
};

export default ImagesGallery;
