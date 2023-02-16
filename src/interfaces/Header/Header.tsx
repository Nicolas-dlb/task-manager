import { useCallback, useContext, useRef, useState } from "react";
import "./Header.scss";
import logo from "../../assets/logo-mobile.svg";
import verticalEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import BoardTitle from "./BoardTitle/BoardTitle";
import { BoardsContext } from "../../utils/providers/BoardsProvider";
import CreateTask from "../../components/Modal/CreateTask/CreateTask";
import { ModalContext } from "../../utils/providers/ModalProvider";
import Settings from "../../components/Modal/Settings/Settings";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd";

function Header(): JSX.Element {
	const { selectedBoard } = useContext(BoardsContext);
	const { setModalComponent } = useContext(ModalContext);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const isBoardEmpty = !selectedBoard?.columns.length;
	const toggleSettingsButton = useRef<HTMLImageElement>(null);

	const openCreateTaskModal = useCallback(
		() => setModalComponent(<CreateTask />),
		[setModalComponent]
	);

	const toggleSettings = useCallback(() => {
		setIsSettingsOpen((prev) => !prev);
	}, []);

	const settings = useOutsideClick(
		useCallback(() => {
			setIsSettingsOpen(false);
		}, []),
		toggleSettingsButton
	);

	return (
		<header data-testid="header">
			<div className="header-content">
				<img src={logo} className="logo" width="24px" height="25px" alt="" />
				<BoardTitle />
			</div>
			<div className="header-content">
				<ButtonAdd
					onClick={openCreateTaskModal}
					item="task"
					disabled={isBoardEmpty}
				/>
				<img
					ref={toggleSettingsButton}
					src={verticalEllipsis}
					onClick={toggleSettings}
					height="16px"
					width="3.6px"
					className="vertical-ellipsis"
					alt=""
				/>
				{isSettingsOpen && (
					<Settings setIsSettingsOpen={setIsSettingsOpen} settings={settings} />
				)}
			</div>
		</header>
	);
}

export default Header;
