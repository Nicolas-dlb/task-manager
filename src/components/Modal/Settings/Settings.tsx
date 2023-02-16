import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
} from "react";
import { BoardsContext } from "../../../utils/providers/BoardsProvider";
import { ModalContext } from "../../../utils/providers/ModalProvider";
import CreateBoard from "../CreateBoard/CreateBoard";
import DeleteBoard from "../DeleteBoard/DeleteBoard";
import "./Settings.scss";

interface SettingsProps {
	setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
	settings: any;
}

function Settings({ setIsSettingsOpen, settings }: SettingsProps) {
	const { setModalComponent } = useContext(ModalContext);
	const { selectedBoard } = useContext(BoardsContext);

	const openEditBoard = useCallback(() => {
		setIsSettingsOpen(false);
		setModalComponent(<CreateBoard board={selectedBoard} />);
	}, [selectedBoard, setIsSettingsOpen, setModalComponent]);

	const openDeleteBoardModal = useCallback(() => {
		setIsSettingsOpen(false);
		setModalComponent(<DeleteBoard board={selectedBoard} />);
	}, [selectedBoard, setIsSettingsOpen, setModalComponent]);

	return (
		<section ref={settings} className="settings">
			<button onClick={openEditBoard} className="btn-edit">
				Edit Board
			</button>
			<button className="btn-delete" onClick={openDeleteBoardModal}>
				Delete board
			</button>
		</section>
	);
}

export default Settings;
