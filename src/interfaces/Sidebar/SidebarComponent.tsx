import { useCallback, useContext } from "react";
import "./SidebarComponent.scss";
import ThemeSwitch from "./ThemeSwitch/ThemeSwitch";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
import useWindowSize from "../../utils/hooks/useWindowSize";
import Menu from "./Menu/Menu";
import { SidebarContext } from "../../utils/providers/SidebarProvider";
import ButtonHideSidebar from "./ButtonHideSidebar/ButtonHideSidebar";
import ButtonShowSidebar from "./ButtonShowSidebar/ButtonShowSidebar";

function SidebarComponent() {
	const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
	const { width } = useWindowSize();
	const isMobile = width < 1224;
	const ref = useOutsideClick(
		useCallback(
			() => isMobile && setIsSidebarOpen(false),
			[isMobile, setIsSidebarOpen]
		)
	);

	if (isMobile && !isSidebarOpen) {
		return null;
	}

	return (
		<div ref={ref} className={`sidebar ${!isSidebarOpen && "close"}`}>
			<div className="sidebar-logo">
				<Logo />
			</div>
			<div className="sidebar-content">
				<Menu />
				<div className="sidebar-bottom">
					<ThemeSwitch />
					<ButtonHideSidebar />
				</div>
			</div>
			<ButtonShowSidebar />
		</div>
	);
}

export default SidebarComponent;
