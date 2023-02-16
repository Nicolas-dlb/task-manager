import { ChangeEvent } from "react";
import "./InputWithError.scss";

interface InputWithErrorProps {
	value: string;
	error: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	className?: string;
}

function InputWithError({
	value,
	error,
	onChange,
	placeholder,
	className,
}: InputWithErrorProps) {
	return (
		<div className={`input-container ${error && "error"}`}>
			<input
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
