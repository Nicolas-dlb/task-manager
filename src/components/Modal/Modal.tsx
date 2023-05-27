import React, { useCallback, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
	selectModalComponent,
	setModalComponent,
} from "../../redux/reducers/appSlice";
import { Board, Task } from "../../utils/types/types";
import {
	selectBoards,
	setSelectedBoard,
} from "../../redux/reducers/boardsSlice";
import ReactModal from "react-modal";
import { ThemeContext } from "../../utils/providers/ThemeProvider";
import { useBoard } from "../../utils/hooks/useBoard";
import useBoards from "../../utils/hooks/useBoards";
import Delete from "./Delete/Delete";
import TaskInfo from "./TaskInfo/TaskInfo";
import Sidebar from "../Sidebar/Sidebar";
import CreateColumn from "./CreateColumn/CreateColumn";
import CreateBoard from "./CreateBoard/CreateBoard";
import CreateTask from "./CreateTask/CreateTask";
import Disconnect from "./Disconnect/Disconnect";

const modalStyles = {
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.276)",
		zIndex: "2",
	},
	content: {
		top: "50%",
		left: "50%",
		overflow: "none",
		background: "none",
		bottom: "auto",
		border: "none",
		transform: "translate(-50%, -50%)",
		borderRadius: "15px",
		padding: "none",
		width: "fit-content",
	},
};

if (process.env.NODE_ENV !== "test") ReactModal.setAppElement("#root");

function Modal() {
	const modalComponent = useAppSelector(selectModalComponent);
	const boards = useAppSelector(selectBoards);
	const dispatch = useAppDispatch();
	const { theme } = useContext(ThemeContext);
	const { board, updateBoard } = useBoard();
	const { setBoards } = useBoards();

	const deleteBoard = useCallback(() => {
		const newBoards = boards!.filter(
			(currentBoard) => currentBoard.id !== board?.id
		);
		setBoards(newBoards);
		dispatch(setSelectedBoard(0));
		dispatch(setModalComponent({ type: null }));
	}, [board, boards]);

	const deleteTask = useCallback(
		(id: string) => {
			const newBoard = {
				...(board as Board),
				columns: board!.columns.map((column) => ({
					...column,
					tasks: column.tasks.filter((task) => task.id !== id),
				})),
			};
			updateBoard(newBoard, board?.id);
		},
		[board, modalComponent]
	);

	const components = {
		CreateTask: <CreateTask />,
		EditTask: <CreateTask task={modalComponent.item as Task} />,
		CreateBoard: <CreateBoard />,
		EditBoard: <CreateBoard board={board as Board} />,
		CreateColumn: <CreateColumn />,
		DeleteBoard: <Delete onDelete={deleteBoard} />,
		DeleteTask: <Delete onDelete={deleteTask} />,
		TaskInfo: <TaskInfo task={modalComponent.item as Task} />,
		Sidebar: <Sidebar />,
		Disconnect: <Disconnect />,
	};

	const modal = components[modalComponent.type as keyof typeof components];

	const handleClickOutside = () => dispatch(setModalComponent({ type: null }));

	return (
		<ReactModal
			id="modal"
			style={modalStyles}
			data={{ theme: theme }}
			isOpen={modalComponent.type !== null}
			onRequestClose={handleClickOutside}
			shouldCloseOnOverlayClick={true}
		>
			{modal}
		</ReactModal>
	);
}

export default Modal;
