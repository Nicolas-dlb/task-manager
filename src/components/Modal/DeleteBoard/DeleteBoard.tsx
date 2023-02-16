import { useCallback, useContext } from "react";
import useOutsideClick from "../../../utils/hooks/useOutsideClick";
import { BoardsContext } from "../../../utils/providers/BoardsProvider";
import { ModalContext } from "../../../utils/providers/ModalProvider";
import { BoardI } from "../../../utils/types/types";
import "./DeleteBoard.scss";

function DeleteBoard({ board }: { board: BoardI }) {
	const { boards, setBoards, setSelectedBoard } = useContext(BoardsContext);
	const { setModalComponent } = useContext(ModalContext);
	const ref = useOutsideClick(() => setModalComponent(null));

	const deleteBoard = useCallback(() => {
		const newBoards = boards.filter((boar: any) => boar.id !== board.id);
		setBoards(newBoards);
		setSelectedBoard(newBoards[0]);
		setModalComponent(null);
	}, [board.id, boards, setBoards, setModalComponent, setSelectedBoard]);

	return (
		<div ref={ref} className="delete-board">
			<h2 className="title">Delete this board ?</h2>
			<p className="message">
				Are you sure you want to delete the 'Platform Launch' board ? This
				action will remove all columns and tasks and cannot be reversed.
			</p>
			<div className="buttons">
				<button onClick={deleteBoard} className="btn-delete">
					<h3>Delete</h3>
				</button>
				<button onClick={() => setModalComponent(null)} className="btn-cancel">
					<h3>Cancel</h3>
				</button>
			</div>
		</div>
	);
}

export default DeleteBoard;
