import React, { useContext } from "react";
import { ThemeContext } from "../../../../utils/providers/ThemeProvider";
import "./Switch.scss";
import { useAppSelector } from "../../../../redux/hooks";
import { selectSidebarOpen } from "../../../../redux/reducers/appSlice";

function Switch() {
	const { theme, switchTheme } = useContext(ThemeContext);
	const isSidebarOpen = useAppSelector(selectSidebarOpen);

	return (
		<button
			aria-label="switch theme"
			onClick={switchTheme}
			tabIndex={isSidebarOpen ? 0 : -1}
			className={`btn-switch ${theme}-selected`}
		>
			<span className="switch-icon" />
		</button>
	);
}

export default Switch;
