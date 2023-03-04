import { ChangeEvent } from "react";
import "./InputWithError.scss";

interface InputWithErrorProps {
	id?: string;
	value: string;
	error: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	className?: string;
}

function InputWithError({
	id,
	value,
	error,
	onChange,
	placeholder,
	className,
}: InputWithErrorProps) {
	return (
		<div className={`input-container ${error && "error"}`}>
			<input
				id={id}
				placeholder={placeholder}
				type="text"
				spellCheck={false}
				onChange={onChange}
				className={`input ${error && "error"} ${className}`}
				value={value}
			/>
		</div>
	);
}

export default InputWithError;
