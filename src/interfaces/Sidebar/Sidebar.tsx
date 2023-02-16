import { useContext, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import useWindowSize from "../../utils/hooks/useWindowSize";
import { ModalContext } from "../../utils/providers/ModalProvider";
import { SidebarContext } from "../../utils/providers/SidebarProvider";
import SidebarComponent from "./SidebarComponent";

function Sidebar() {
	const { modalComponent } = useContext(ModalContext);
	const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
	const { width } = useWindowSize();
	const isMobile = width < 768;

	useEffect(() => {
		if (isMobile && isSidebarOpen && modalComponent) {
			setIsSidebarOpen(false);
		}
	}, [isMobile, isSidebarOpen, modalComponent, setIsSidebarOpen]);

	return isMobile && isSidebarOpen ? (
		<Modal>
			<SidebarComponent />
		</Modal>
	) : (
		<SidebarComponent />
	);
}

export default Sidebar;
