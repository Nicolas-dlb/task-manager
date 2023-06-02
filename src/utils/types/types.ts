export type Task = {
	title: string;
	description: string;
	status: string;
	subtasks: Subtask[];
	id: string;
};

export type Subtask = {
	title: string;
	isCompleted: boolean;
	id: string;
};

export type Column = {
	name: string;
	tasks: Task[];
	id: string;
};
export interface Board {
	id: string;
	name: string;
	columns: Column[];
}

export type TaskWithoutId = {
	title: string;
	description: string;
	status: string;
	subtasks: SubtaskWithoutId[];
};

export type SubtaskWithoutId = {
	title: string;
	isCompleted: boolean;
};

export type ColumnWithoutId = {
	name: string;
	tasks: TaskWithoutId[];
};
export interface BoardWithoutId {
	name: string;
	columns: ColumnWithoutId[];
}
