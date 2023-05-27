import React, { memo, useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./Column/Column";
import { useAppDispatch } from "../../../../redux/hooks";
import { setBoards } from "../../../../redux/reducers/boardsSlice";
import { Board, Column as IColumn } from "../../../../utils/types/types";
import { useBoard } from "../../../../utils/hooks/useBoard";
import NewColumn from "./NewColumn/NewColumn";
import useBoards from "../../../../utils/hooks/useBoards";
import isEqual from "lodash/isEqual";

function Columns() {
	const dispatch = useAppDispatch();
	const { board, updateBoard } = useBoard();
	const { boards } = useBoards();

	const onDragEnd = useCallback(
		(result: DropResult) => {
			if (!result.destination) {
				return;
			}

			const sourceIndex = result.source.index;
			const destIndex = result.destination.index;
			let updatedColumns: IColumn[];

			const sourceColumn = board?.columns.find(
				(column) => column.id === result.source.droppableId
			) as IColumn;
			const destColumn = board?.columns.find(
				(column) => column.id === result.destination!.droppableId
			) as IColumn;

			if (sourceColumn === destColumn) {
				const tasks = Array.from(sourceColumn!.tasks);
				const [removed] = tasks.splice(sourceIndex, 1);
				tasks.splice(destIndex, 0, removed);

				const updatedIColumn = {
					...sourceColumn,
					tasks: tasks,
				};

				updatedColumns = board!.columns.map((column) =>
					column.id === updatedIColumn.id ? updatedIColumn : column
				);
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
					if (task.id === result.draggableId) {
						return {
							...task,
							status: updatedDestColumn.name,
						};
					}

					return task;
				});

				updatedDestColumn.tasks = updatedTasks;

				updatedColumns = board!.columns.map((column) => {
					if (column.id === updatedSourceColumn.id) {
						return updatedSourceColumn;
					} else if (column.id === updatedDestColumn.id) {
						return updatedDestColumn;
					} else {
						return column;
					}
				}) as IColumn[];
			}

			const newBoard = { ...(board as Board), columns: updatedColumns };

			if (!isEqual(updatedColumns, board?.columns)) {
				dispatch(
					setBoards(
						boards!.map((board) => {
							if (board.id === newBoard.id) {
								return newBoard;
							}
							return board;
						})
					)
				);
				updateBoard(newBoard);
			}
		},
		[board?.columns]
	);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			{board?.columns.map((column, index) => (
				<Column key={index} column={column} index={index} />
			))}
			<NewColumn />
		</DragDropContext>
	);
}

export default memo(Columns);
