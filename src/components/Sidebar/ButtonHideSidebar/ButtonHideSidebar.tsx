import React, { useContext } from "react";
import { ReactComponent as HideIcon } from "../../../assets/icon-hide-sidebar.svg";
import "./ButtonHideSidebar.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	selectSidebarOpen,
	setIsSidebarOpen,
} from "../../../redux/reducers/appSlice";
import { ThemeContext } from "../../../utils/providers/ThemeProvider";

function ButtonHideSidebar() {
	const dispatch = useAppDispatch();
	const isSidebarOpen = useAppSelector(selectSidebarOpen);
	const { theme } = useContext(ThemeContext);

	return (
		<button
			data-theme={theme}
			tabIndex={isSidebarOpen ? 0 : -1}
			onClick={() => dispatch(setIsSidebarOpen(false))}
			className="btn-hide-sidebar"
		>
			<HideIcon />
			<h4>Hide Sidebar</h4>
		</button>
	);
}

export default ButtonHideSidebar;
