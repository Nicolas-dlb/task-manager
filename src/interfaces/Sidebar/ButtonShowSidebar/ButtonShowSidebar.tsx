import React, { useContext } from "react";
import { SidebarContext } from "../../../utils/providers/SidebarProvider";
import { ReactComponent as ShowIcon } from "../../../assets/icon-show-sidebar.svg";
import "./ButtonShowSidebar.scss";

function ButtonShowSidebar() {
	const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
	return (
		<button
			id="btn-show-Sidebar"
			onClick={() => setIsSidebarOpen(true)}
			className={`btn-show-sidebar ${!isSidebarOpen && "show"}`}
		>
			<ShowIcon />
		</button>
	);
}

export default ButtonShowSidebar;
