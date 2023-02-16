import { ChangeEvent } from "react";
import { ReactComponent as CrossIcon } from "../../assets/icon-cross.svg";
import "./RemovableInput.scss";

interface RemovableInputProps {
	placeholder: string;
	onChange: (value: string, index: number) => void;
	onDelete: (index: number) => void;
	value: string;
	index: number;
}

function RemovableInput({
	placeholder,
	onChange,
	onDelete,
	value,
	index,
}: RemovableInputProps) {
	const deleteItem = () => onDelete(index);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		onChange(e.target.value, index);

	return (
		<div className="removable-input">
			<input
				type="text"
				placeholder={placeholder}
				spellCheck={false}
				value={value}
				onChange={handleChange}
			/>
			<CrossIcon onClick={deleteItem} className="delete-icon" />
		</div>
	);
}

export default RemovableInput;
