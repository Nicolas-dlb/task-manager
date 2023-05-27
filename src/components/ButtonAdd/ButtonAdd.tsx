import { stringUppercaseFirst } from "../../utils/helpers";
import { ReactComponent as IconCross } from "../../assets/icon-cross.svg";
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
			aria-label={`Add ${item}`}
			type="button"
			className={`btn-add btn-add-${item} ${className}`}
		>
			<IconCross />
			<h3>Add New {stringUppercaseFirst(item)}</h3>
		</button>
	);
}

export default ButtonAdd;
