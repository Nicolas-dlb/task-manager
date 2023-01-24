import React, { useContext } from "react";
import { SidebarContext } from "../../../utils/providers/SidebarProvider";
import { ReactComponent as HideIcon } from "../../../assets/icon-hide-sidebar.svg";
import "./ButtonHideSidebar.scss";

function ButtonHideSidebar() {
	const { setIsSidebarOpen } = useContext(SidebarContext);

	return (
		<button
			onClick={() => setIsSidebarOpen(false)}
			className="btn-hide-sidebar"
		>
			<HideIcon />
			<h4>Hide Sidebar</h4>
		</button>
	);
}

export default ButtonHideSidebar;
