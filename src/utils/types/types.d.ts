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
