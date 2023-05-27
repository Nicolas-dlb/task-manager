import { ChangeEvent, useCallback } from "react";
import { ReactComponent as CrossIcon } from "../../assets/icon-cross.svg";
import { ReactComponent as HamburgerIcon } from "../../assets/icon-hamburger.svg";
import "./RemovableInput.scss";

interface RemovableInputProps {
	placeholder: string;
	onChange: (value: string, index: number) => void;
	onDelete: (index: number) => void;
	value: string;
	maxLength?: number;
	index: number;
	id?: string;
}

function RemovableInput({
	placeholder,
	onChange,
	onDelete,
	value,
	maxLength,
	index,
	id,
	...dragListeners
}: RemovableInputProps) {
	const deleteItem = useCallback(() => onDelete(index), [index, onDelete]);

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value, index),
		[index, onChange]
	);

	return (
		<div className="removable-input">
			<button type="button" className="drag-handle" {...dragListeners}>
				<HamburgerIcon stroke="var(--medium-grey)" width="20px" height="20px" />
			</button>
			<input
				type="text"
				id={id}
				autoComplete="off"
				placeholder={placeholder}
				spellCheck={false}
				value={value}
				maxLength={maxLength}
				onChange={handleChange}
			/>
			<button type="button" onClick={deleteItem} className="btn-delete">
				<CrossIcon className="delete-icon" />
			</button>
		</div>
	);
}

export default RemovableInput;
