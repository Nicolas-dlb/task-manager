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

type taskI = {
	title: string;
	description: string;
	status: string;
	subtasks: subtasksI[];
};

type subtasksI = {
	title: string;
	isCompleted: boolean;
};

export interface BoardI {
	name: string;
	tasks: TaskI[];
}
