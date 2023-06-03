import React, { Fragment } from "react";

const Buttons = ({ type, className, text, onClick }) => {
	return (
		<Fragment>
			<button type={type} className={className} onClick={onClick}>
				{text}
			</button>
		</Fragment>
	);
};

export default Buttons;
