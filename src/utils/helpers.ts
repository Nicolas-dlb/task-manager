import { Board } from "./types/types";

export const stringUppercaseFirst = (string: string) =>
	`${string}`.charAt(0).toUpperCase() + string.substr(1);

export const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const getDefaultBoard = () => {
	return [
		{
			name: "Get Started",
			columns: [
				{
					id: crypto.randomUUID(),
					name: "Todo",
					tasks: [
						{
							title: "My first task",
							id: crypto.randomUUID(),
							status: "Todo",
							description: "Describe your task and the objective to achieve.",
							subtasks: [
								{
									title: "Create a task",
									isCompleted: false,
									id: crypto.randomUUID(),
								},
								{
									id: crypto.randomUUID(),
									isCompleted: false,
									title: "Update the status",
								},
								{
									id: crypto.randomUUID(),
									isCompleted: false,
									title: "Make the task",
								},
							],
						},
					],
				},
				{
					name: "Doing",
					tasks: [],
					id: crypto.randomUUID(),
				},
				{
					name: "Done",
					id: crypto.randomUUID(),
					tasks: [],
				},
			],
			id: crypto.randomUUID(),
		},
	];
};

export const addIDToData = (data: Exclude<Board, "id">[]) => {
	return data.map((board) => {
		const BoardId = crypto.randomUUID();
		return {
			...board,
			id: BoardId,
			columns: board.columns.map((column) => {
				const columnId = crypto.randomUUID();
				return {
					...column,
					id: columnId,
					tasks: column.tasks.map((task) => {
						const taskId = crypto.randomUUID();
						return {
							...task,
							id: taskId,
							subtasks: task.subtasks.map((subtask) => {
								const subtaskId = crypto.randomUUID();
								return {
									...subtask,
									id: subtaskId,
								};
							}),
						};
					}),
				};
			}),
		};
	});
};

export const hideUselessLogs = () => {
	console.warn = function (message) {
		if (
			message.indexOf(
				"Nested scroll containers are currently not supported."
			) === -1
		) {
			console.error(message);
		}
	};
};
