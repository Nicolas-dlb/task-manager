import { useContext } from "react";
import Modal from "../../components/Modal/Modal";
import { ModalContext } from "../../utils/providers/ModalProvider";
import { ThemeContext } from "../../utils/providers/ThemeProvider";
import Board from "../Board/Board";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./App.scss";

function App(): JSX.Element {
	const { theme } = useContext(ThemeContext);
	const { modalComponent } = useContext(ModalContext);

	return (
		<div className="app" data-theme={theme}>
			<Sidebar />
			<Header />
			<Board />
			{modalComponent && <Modal>{modalComponent}</Modal>}
		</div>
	);
}

export default App;
