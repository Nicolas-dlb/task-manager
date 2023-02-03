import { ReactComponent as AddItemIcon } from "../../assets/icon-add-task-mobile.svg";
import { stringUppercaseFirst } from "../../utils/helpers/helpers";
import "./AddItemButton.scss";

interface AddItemButtonProps {
	item: string;
	classNames?: string;
	disabled?: boolean;
	onClick?: () => void;
}

function AddItemButton({
	item,
	classNames,
	disabled,
	onClick,
}: AddItemButtonProps) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			type="button"
			className={`btn-add-item btn-add-${item} ${classNames}`}
		>
			<AddItemIcon />
			<h3>Add New {stringUppercaseFirst(item)}</h3>
		</button>
	);
}

export default AddItemButton;
