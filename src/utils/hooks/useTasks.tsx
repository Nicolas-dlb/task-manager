import { Subtask, Task } from "../types/types";
import { useBoard } from "./useBoard";

function useTasks() {
	const { board } = useBoard();
	const { updateBoard } = useBoard();

	const addTask = (task: Task) => {
		const newColumnIndex = board?.columns.findIndex(
			(column) => column.name === task.status
		) as number;

		let newBoard = JSON.parse(JSON.stringify(board));

		newBoard.columns![newColumnIndex].tasks.push(task);
		updateBoard(newBoard);
	};

	const editTask = (task: Task, newTask: Task) => {
		let newBoard = JSON.parse(JSON.stringify(board));

		const newColumnIndex = board?.columns.findIndex(
			(column) => column.name === newTask.status
		) as number;

		const columnIndex = board?.columns.findIndex(
			(column) => column.name === task.status
		) as number;

		const taskIndex = board?.columns[columnIndex].tasks.findIndex(
			(item: Task) => item?.id === task?.id
		) as number;

		if (newTask.status === task.status) {
			newBoard.columns![columnIndex].tasks[taskIndex] = newTask;
			updateBoard(newBoard);
		} else {
			newBoard.columns![columnIndex].tasks = newBoard.columns![
				columnIndex
			].tasks.filter((item: Task, index: number) => index !== taskIndex);
			newBoard.columns![newColumnIndex].tasks.push(newTask);
			updateBoard(newBoard);
		}
	};

	const createSubtasks = (number: number): Subtask[] => {
		const subtasks = [];
		for (let i = 0; i < number; i++) {
			subtasks.push({
				title: "",
				isCompleted: false,
				id: crypto.randomUUID(),
			});
		}
		return subtasks;
	};

	return { addTask, editTask, createSubtasks };
}

export default useTasks;
