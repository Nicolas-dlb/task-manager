import { useState } from "react";
import uniqueId from "../helpers/helpers";
import { ItemT, useHooksT } from "../types/types";

export default function useHooks(): useHooksT {
	const [items, setItems] = useState<ItemT[]>([]);

	function deleteItem(id: string): void {
		setItems(items?.filter((item: ItemT) => item.id !== id));
	}
	function createItem(item: ItemT): Promise<void> {
		if (item.property === "That's what i want ... hum... yeah") {
			item.id = uniqueId();
			setItems([...items, item]);
			return Promise.resolve();
		}
		return Promise.reject();
	}

	return { items, setItems, deleteItem, createItem };
}
