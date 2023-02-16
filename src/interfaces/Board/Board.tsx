import { useCallback, useContext } from "react";
import ButtonCreate from "../../components/ButtonCreate/ButtonCreate";
import CreateColumn from "../../components/Modal/CreateColumn/CreateColumn";
import { BoardsContext } from "../../utils/providers/BoardsProvider";
import { ModalContext } from "../../utils/providers/ModalProvider";
import { SidebarContext } from "../../utils/providers/SidebarProvider";
import "./Board.scss";
import Column from "./Column/Column";

function Board() {
	const { isSidebarOpen } = useContext(SidebarContext);
	const { selectedBoard } = useContext(BoardsContext);
	const { setModalComponent } = useContext(ModalContext);

	const openCreateColumnModal = useCallback(() => {
		setModalComponent(<CreateColumn />);
	}, [setModalComponent]);

	return (
		<div className={`board ${!isSidebarOpen && "close"}`}>
			{selectedBoard?.columns.length ? (
				<>
					{selectedBoard?.columns.map((column) => (
						<Column key={column.id} column={column} />
					))}
					<button onClick={openCreateColumnModal} className="new-column">
						<h2>+ New Column</h2>
					</button>
				</>
			) : (
				<section className="empty-board">
					<div className="empty-board-content">
						<h3>This board is empty. Create a new column to get started.</h3>
						<ButtonCreate onClick={openCreateColumnModal}>
							+ Add New Column
						</ButtonCreate>
					</div>
				</section>
			)}
		</div>
	);
}

export default Board;
