type TaskT = {
	title: string;
	description: string;
	status: string;
	subtasks: SubtaskT[];
	id: string;
};

type SubtaskT = {
	title: string;
	isCompleted: boolean;
	id: string;
};

type ColumnT = {
	name: string;
	tasks: TaskT[];
	id: string;
};
export interface BoardI {
	id: string;
	name: string;
	columns: ColumnT[];
}
