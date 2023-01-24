import { useContext } from "react";
import addItemIcon from "../../assets/icon-add-task-mobile.svg";
import { stringUppercaseFirst } from "../../utils/helpers/helpers";
import { BoardsContext } from "../../utils/providers/BoardsProviders";
import "./AddItemButton.scss";

interface AddItemButtonProps {
	item: string;
	classNames?: string;
}

function AddItemButton({ item, classNames }: AddItemButtonProps) {
	const { selectedBoard } = useContext(BoardsContext);

	return (
		<button
			disabled={selectedBoard && !selectedBoard!.columns.length ? true : false}
			type="button"
			className={`btn-add-item btn-add-${item} ${classNames}`}
		>
			<img src={addItemIcon} width="9px" height="10px" alt="" />
			<h3>Add New {stringUppercaseFirst(item)}</h3>
		</button>
	);
}

export default AddItemButton;
