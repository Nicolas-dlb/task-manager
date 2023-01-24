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

export interface ThemeContextI {
	theme: string;
	switchTheme: () => void;
}

export interface SidebarContextI {
	isSidebarOpen: boolean;
	setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export interface BoardsContextI {
	boards: BoardI[] | null;
	setBoards: Dispatch<SetStateAction<BoardI[]>>;
	selectedBoard: BoardI | null;
	setSelectedBoard: Dispatch<SetStateAction<BoardI | null>>;
}

type taskT = {
	title: string;
	description: string;
	status: string;
	subtasks: subtasksT[];
};

type subtasksT = {
	title: string;
	isCompleted: boolean;
};
type ColumnT = {
	name: string;
	tasks: TaskT[];
};
export interface BoardI {
	name: string;
	columns: columnT[];
}
