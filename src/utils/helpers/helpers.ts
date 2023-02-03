import { BoardI } from "../types/types";

export function uniqueId(): string {
	const prefix = "id";
	let c = 0;
	const r = Math.floor(Math.random() * 1000);
	const str = `-${c}-${r}`;
	c += 1;
	return prefix + str;
}

export const stringUppercaseFirst = (string: string) =>
	`${string}`.charAt(0).toUpperCase() + string.substr(1);

export const createSubtasks = (number: number) => {
	const subtasks = [];
	for (let i = 0; i < number; i++) {
		subtasks.push({ title: "", isCompleted: false, id: uniqueId() });
	}
	return subtasks;
};

export const addIDToData = (data: any) => {
	return data.boards.map((board: BoardI) => {
		const newBoard = {
			...board,
			id: uniqueId(),
			columns: board.columns.map((column) => {
				const newColumn = {
					...column,
					tasks: column.tasks.map((task) => {
						return {
							...task,
							subtasks: task.subtasks.map((subtask) => ({
								...subtask,
								id: uniqueId(),
							})),
							id: uniqueId(),
						};
					}),
				};
				return newColumn;
			}),
		};
		return newBoard;
	});
};
