import { useContext } from "react";
import { BoardsContext } from "../providers/BoardsProvider";
import { BoardI, TaskT } from "../types/types";

function useTasks() {
	const { selectedBoard, setSelectedBoard } = useContext(BoardsContext);

	const addTask = (task: TaskT) => {
		const newColumnIndex = selectedBoard?.columns.findIndex(
			(column) => column.name === task.status
		) as number;

		let newBoard = { ...(selectedBoard as BoardI) };

		newBoard.columns![newColumnIndex].tasks.push(task);
		setSelectedBoard(newBoard);
	};

	const editTask = (task: TaskT, newTask: TaskT) => {
		let newBoard = { ...(selectedBoard as BoardI) };
		const newColumnIndex = selectedBoard?.columns.findIndex(
			(column) => column.name === newTask.status
		) as number;

		const columnIndex = selectedBoard?.columns.findIndex(
			(column) => column.name === task.status
		) as number;

		const taskIndex = selectedBoard?.columns[columnIndex].tasks.findIndex(
			(item: TaskT) => item?.id === task?.id
		) as number;

		if (newTask.status === task.status) {
			newBoard.columns![columnIndex].tasks[taskIndex] = newTask;
			setSelectedBoard(newBoard);
		} else {
			newBoard.columns![columnIndex].tasks = newBoard.columns![
				columnIndex
			].tasks.filter((item, index) => index !== taskIndex);
			newBoard.columns![newColumnIndex].tasks.push(newTask);
			setSelectedBoard(newBoard);
		}
	};

	return { addTask, editTask };
}

export default useTasks;
