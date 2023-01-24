import { useContext } from "react";
import Modal from "../../components/Modal/Modal";
import useWindowSize from "../../utils/hooks/useWindowSize";
import { SidebarContext } from "../../utils/providers/SidebarProvider";
import { ThemeContext } from "../../utils/providers/ThemeProvider";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./App.css";

function App(): JSX.Element {
	const { theme } = useContext(ThemeContext);
	const { isSidebarOpen } = useContext(SidebarContext);
	const { width } = useWindowSize();
	const isMobile = width < 768;

	return (
		<div className="app" data-theme={theme}>
			{isMobile && isSidebarOpen ? (
				<Modal>
					<Sidebar />
				</Modal>
			) : (
				<Sidebar />
			)}
			<Header />
		</div>
	);
}

export default App;
