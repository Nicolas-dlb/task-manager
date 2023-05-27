import React, { useContext } from "react";
import "./Spinner.scss";
import { ThemeContext } from "../../utils/providers/ThemeProvider";

function Spinner() {
	const { theme } = useContext(ThemeContext);
	return (
		<div data-theme={theme} className="lds-roller">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}

export default Spinner;
