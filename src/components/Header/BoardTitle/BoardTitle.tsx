import React, { memo, useCallback } from "react";
import chevronDown from "../../../assets/icon-chevron-down.svg";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	selectSidebarOpen,
	setIsSidebarOpen,
} from "../../../redux/reducers/appSlice";
import { useWindowSize } from "usehooks-ts";
import { useBoard } from "../../../utils/hooks/useBoard";
import "./BoardTitle.scss";

function BoardTitle() {
	const isSidebarOpen = useAppSelector(selectSidebarOpen);
	const dispatch = useAppDispatch();
	const { board } = useBoard();
	const { width } = useWindowSize();
	const isDesktop = width >= 1224;

	const toggleSidebar = useCallback(
		() => dispatch(setIsSidebarOpen(!isSidebarOpen)),
		[isSidebarOpen]
	);

	const name = board === null ? "Loading" : board?.name;

	const chevronDownStyle = { rotate: isSidebarOpen ? "180deg" : "none" };

	return (
		<button
			onClick={toggleSidebar}
			disabled={isDesktop}
			className={`board-title ${isSidebarOpen && "sidebar-open"}`}
		>
			<h2>{name || "Boards empty"}</h2>
			<img
				src={chevronDown}
				style={chevronDownStyle}
				width="9px"
				height="6px"
				alt=""
			/>
		</button>
	);
}

export default memo(BoardTitle);
