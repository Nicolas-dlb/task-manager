import React, { useContext } from "react";
import Spinner from "../Spinner/Spinner";
import "./LoadingScreen.scss";
import { ThemeContext } from "../../utils/providers/ThemeProvider";

function LoadingScreen() {
	const { theme } = useContext(ThemeContext);
	return (
		<section data-theme={theme} className="loading-screen">
			<Spinner />
		</section>
	);
}

export default LoadingScreen;
