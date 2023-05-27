import { useCallback, useRef } from "react";
import "./Sidebar.scss";
import ThemeSwitch from "./ThemeSwitch/ThemeSwitch";
import Menu from "./Menu/Menu";
import ButtonHideSidebar from "./ButtonHideSidebar/ButtonHideSidebar";
import ButtonShowSidebar from "./ButtonShowSidebar/ButtonShowSidebar";
import { useAppSelector } from "../../redux/hooks";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import {
	selectSidebarOpen,
	setIsSidebarOpen,
} from "../../redux/reducers/appSlice";
import { useOnClickOutside, useWindowSize } from "usehooks-ts";
import { useDispatch } from "react-redux";

function Sidebar() {
	const isSidebarOpen = useAppSelector(selectSidebarOpen);
	const dispatch = useDispatch();
	const { width } = useWindowSize();
	const isMobile = width < 1224;
	const sidebar = useRef<HTMLDivElement>(null);

	useOnClickOutside(
		sidebar,
		useCallback(
			() => isMobile && dispatch(setIsSidebarOpen(false)),
			[isMobile, setIsSidebarOpen]
		)
	);

	if (isMobile && !isSidebarOpen) {
		return null;
	}

	return (
		<div ref={sidebar} className={`sidebar ${!isSidebarOpen && "close"}`}>
			<div className="sidebar__logo">
				<Logo />
			</div>
			<div className="sidebar__content">
				<Menu />
				<div className="sidebar__content__bottom">
					<ThemeSwitch />
					<ButtonHideSidebar />
				</div>
			</div>
			<ButtonShowSidebar />
		</div>
	);
}

export default Sidebar;
