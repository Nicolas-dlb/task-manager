export type ItemT = {
	property: string;
	id: string;
};

interface useHooksT {
	items: ItemT[];
	createItem: (itemData: ItemT) => Promise<void>;
	deleteItem: (id: string) => void;
	setItems: Dispatch<SetStateAction<ItemT[]>>;
}
