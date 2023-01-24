import React, { useContext } from "react";
import { SidebarContext } from "../../../utils/providers/SidebarProvider";
import chevronDown from "../../../assets/icon-chevron-down.svg";
import "./BoardTitle.scss";
import { BoardsContext } from "../../../utils/providers/BoardsProviders";

function BoardTitle() {
	const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
	const { selectedBoard } = useContext(BoardsContext);

	return (
		<div
			onClick={() => setIsSidebarOpen((prev: boolean) => !prev)}
			className={`board-title ${isSidebarOpen && "sidebar-open"}`}
		>
			<h2>{selectedBoard?.name || "Boards empty"}</h2>
			<img
				src={chevronDown}
				style={{ rotate: isSidebarOpen ? "180deg" : "none" }}
				width="9px"
				height="6px"
				alt=""
			/>
		</div>
	);
}

export default BoardTitle;
