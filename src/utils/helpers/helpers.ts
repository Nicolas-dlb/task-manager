import { BoardI, ColumnT, SubtaskT } from "../types/types";

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

export const createSubtasks = (number: number): SubtaskT[] => {
	const subtasks = [];
	for (let i = 0; i < number; i++) {
		subtasks.push({ title: "", isCompleted: false, id: uniqueId() });
	}
	return subtasks;
};

export const createColumns = (number: number): ColumnT[] => {
	const columns = [];
	for (let i = 0; i < number; i++) {
		columns.push({ id: uniqueId(), name: "", tasks: [] });
	}
	return columns;
};

export const addIDToData = (data: any) => {
	return data.boards.map((board: BoardI) => {
		const newBoard = {
			...board,
			id: uniqueId(),
			columns: board.columns.map((column) => {
				const newColumn = {
					...column,
					id: uniqueId(),
					tasks: column.tasks.map((task) => {
						return {
							...task,
							id: uniqueId(),
							subtasks: task.subtasks.map((subtask) => ({
								...subtask,
								id: uniqueId(),
							})),
						};
					}),
				};
				return newColumn;
			}),
		};
		return newBoard;
	});
};
