export type ItemT = {
	property: string;
	id: string;
};

export interface useHooksT {
	items: ItemT[];
	createItem: (itemData: ItemT) => Promise<void>;
	deleteItem: (id: string) => void;
	setItems: Dispatch<SetStateAction<ItemT[]>>;
}

type TaskT = {
	title: string;
	description: string;
	status: string;
	subtasks: subtasksT[];
	id: string;
};

type subtasksT = {
	title: string;
	isCompleted: boolean;
	id: string;
};
type ColumnT = {
	name: string;
	tasks: TaskT[];
};
export interface BoardI {
	name: string;
	columns: ColumnT[];
}
