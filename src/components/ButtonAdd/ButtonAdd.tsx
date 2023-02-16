import { ReactComponent as AddItemIcon } from "../../assets/icon-add-task-mobile.svg";
import { stringUppercaseFirst } from "../../utils/helpers/helpers";
import "./ButtonAdd.scss";

interface ButtonAddProps {
	item: string;
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
}

function ButtonAdd({ item, className, disabled, onClick }: ButtonAddProps) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			aria-label="Add task"
			type="button"
			className={`btn-add-item btn-add-${item} ${className}`}
		>
			<AddItemIcon />
			<h3>Add New {stringUppercaseFirst(item)}</h3>
		</button>
	);
}

export default ButtonAdd;
