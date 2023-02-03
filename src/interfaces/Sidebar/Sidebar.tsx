import React, { useContext } from "react";
import Modal from "../../components/Modal/Modal";
import useWindowSize from "../../utils/hooks/useWindowSize";
import { ModalContext } from "../../utils/providers/ModalProvider";
import { SidebarContext } from "../../utils/providers/SidebarProvider";
import SidebarComponent from "./SidebarComponent";

function Sidebar() {
	const { modalComponent, setModalComponent } = useContext(ModalContext);
	const { isSidebarOpen } = useContext(SidebarContext);
	const { width } = useWindowSize();
	const isMobile = width < 768;

	if (isMobile && isSidebarOpen) {
		modalComponent && setModalComponent(null);
		return (
			<Modal>
				<SidebarComponent />
			</Modal>
		);
	}

	return <SidebarComponent />;
}

export default Sidebar;
