import React, {
	ChangeEvent,
	Dispatch,
	KeyboardEvent,
	SetStateAction,
	memo,
	useRef,
} from "react";
import "./Checkbox.scss";

interface CheckboxProps {
	checked: boolean;
	onChange: () => void;
}

function Checkbox({ checked, onChange }: CheckboxProps) {
	const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.code === "Enter") {
			// Disable Firefox's default behavior to avoid calling the event twice
			e.preventDefault();
			onChange();
		}
	};

	return (
		<span className="checkbox">
			<input
				onKeyDown={handleEnterKey}
				type="checkbox"
				onChange={onChange}
				checked={checked}
			/>
			{/* Span that take focus-visible of the input to create customizable style */}
			<span />
			<span className="checkmark"></span>
		</span>
	);
}

export default memo(Checkbox);
