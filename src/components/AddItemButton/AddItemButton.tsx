import addItemIcon from "../../assets/icon-add-task-mobile.svg";
import { stringUppercaseFirst } from "../../utils/helpers/helpers";
import "./AddItemButton.scss";

interface AddItemButtonProps {
	item: string;
	classNames?: string;
}

function AddItemButton({ item, classNames }: AddItemButtonProps) {
	return (
		<button
			type="button"
			className={`btn-add-item btn-add-${item} ${classNames}`}
		>
			<img src={addItemIcon} width="9px" height="10px" alt="" />
			<h3>Add New {stringUppercaseFirst(item)}</h3>
		</button>
	);
}

export default AddItemButton;
