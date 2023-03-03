import React, { useContext } from "react";
import { ThemeContext } from "../../../../utils/providers/ThemeProvider";
import "./Switch.scss";

function Switch() {
	const { theme, switchTheme } = useContext(ThemeContext);
	return (
		<button
			aria-label="switch theme"
			onClick={switchTheme}
			className={`btn-switch ${theme}-selected`}
		>
			<span className="switch-icon" />
		</button>
	);
}

export default Switch;
