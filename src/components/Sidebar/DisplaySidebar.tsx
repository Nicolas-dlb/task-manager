import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useWindowSize } from "usehooks-ts";
import { useAppSelector } from "../../redux/hooks";
import {
	selectSidebarOpen,
	setModalComponent,
} from "../../redux/reducers/appSlice";
import Sidebar from "./Sidebar";

function DisplaySidebar() {
	const isSidebarOpen = useAppSelector(selectSidebarOpen);
	const dispatch = useDispatch();
	const { width } = useWindowSize();
	const isMobile = width < 1224;

	useEffect(() => {
		if (!isMobile) dispatch(setModalComponent({ type: null }));
		if (isMobile && isSidebarOpen) {
			dispatch(setModalComponent({ type: "Sidebar" }));
		}
	}, [isMobile, isSidebarOpen, setModalComponent]);

	if (isMobile) {
		return null;
	}

	return <Sidebar />;
}

export default DisplaySidebar;
