import { useCallback, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ButtonCreate from "../../components/ButtonCreate/ButtonCreate";
import CreateColumn from "../../components/Modal/CreateColumn/CreateColumn";
import { BoardsContext } from "../../utils/providers/BoardsProvider";
import { ModalContext } from "../../utils/providers/ModalProvider";
import { SidebarContext } from "../../utils/providers/SidebarProvider";
import { ColumnT } from "../../utils/types/types";
import "./Board.scss";
import Column from "./Column/Column";

function Board() {
	const { isSidebarOpen } = useContext(SidebarContext);
	const { selectedBoard, setSelectedBoard } = useContext(BoardsContext);
	const { setModalComponent } = useContext(ModalContext);

	const openCreateColumnModal = useCallback(() => {
		setModalComponent(<CreateColumn />);
	}, [setModalComponent]);

	const onDragEnd = (result: any) => {
		if (!result.destination) {
			return;
		}

		const sourceIndex = result.source.index;
		const destIndex = result.destination.index;
		let updatedColumns: ColumnT[];
		if (result.type === "column") {
			const columns = Array.from(selectedBoard.columns);
			const [removed] = columns.splice(sourceIndex, 1);
			columns.splice(destIndex, 0, removed);
			// TODO: update the state of the columns
		} else {
			const sourceColumn = selectedBoard.columns.find(
				(column) => column.id === result.source.droppableId
			) as ColumnT;
			const destColumn = selectedBoard.columns.find(
				(column) => column.id === result.destination.droppableId
			) as ColumnT;

			if (sourceColumn === destColumn) {
				const tasks = Array.from(sourceColumn!.tasks);
				const [removed] = tasks.splice(sourceIndex, 1);
				tasks.splice(destIndex, 0, removed);

				const updatedColumn = {
					...sourceColumn,
					tasks: tasks,
				};

				updatedColumns = selectedBoard.columns.map((column) =>
					column.id === updatedColumn.id ? updatedColumn : column
				);

				// TODO: update the state of the columns
			} else {
				const sourceTasks = Array.from(sourceColumn!.tasks);
				const [removed] = sourceTasks.splice(sourceIndex, 1);
				const destTasks = Array.from(destColumn!.tasks);
				destTasks.splice(destIndex, 0, removed);

				const updatedSourceColumn = {
					...sourceColumn,
					tasks: sourceTasks,
				};

				const updatedDestColumn = {
					...destColumn,
					tasks: destTasks,
				};

				const updatedTasks = updatedDestColumn.tasks.map((task) => {
					if (task.id === result.draggableId && updatedDestColumn) {
						task.status = updatedDestColumn.name;
					}
					return task;
				});
				console.log(updatedTasks);

				updatedColumns = selectedBoard.columns.map((column) => {
					if (column.id === updatedSourceColumn.id) {
						return updatedSourceColumn;
					} else if (column.id === updatedDestColumn.id) {
						return updatedDestColumn;
					} else {
						return column;
					}
				}) as ColumnT[];

				// TODO: update the state of the columns
			}
			setSelectedBoard((prev) => {
				const newBoard = { ...prev, columns: updatedColumns };
				return newBoard;
			});
		}
	};

	return (
		<section className={`board ${!isSidebarOpen && "close"}`}>
			{selectedBoard?.columns.length ? (
				<DragDropContext onDragEnd={onDragEnd}>
					{selectedBoard?.columns.map((column) => (
						<Column key={column.id} column={column} />
					))}
					<button onClick={openCreateColumnModal} className="new-column">
						<h2>+ New Column</h2>
					</button>
				</DragDropContext>
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
		</section>
	);
}

export default Board;
