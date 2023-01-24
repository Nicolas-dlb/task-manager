import React, { useContext } from "react";
import { ThemeContext } from "../../../../utils/providers/ThemeProvider";
import "./Switch.scss";

function Switch() {
	const { theme, switchTheme } = useContext(ThemeContext);
	return (
		<div className={`switch ${theme}-selected`}>
			<button onClick={switchTheme} className="btn-switch" />
		</div>
	);
}

export default Switch;
