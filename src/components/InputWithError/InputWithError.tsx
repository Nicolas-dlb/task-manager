import { ChangeEvent, InputHTMLAttributes } from "react";
import "./InputWithError.scss";

interface InputWithErrorProps {
	id?: string;
	value: string;
	error: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	className?: string;
	type?: string;
}

function InputWithError({
	id,
	value,
	error,
	onChange,
	placeholder,
	className,
	type = "text",
	...props
}: InputWithErrorProps & InputHTMLAttributes<HTMLInputElement>) {
	return (
		<div className={`input-container ${error && "error"}`}>
			<input
				id={id}
				placeholder={placeholder}
				type={type}
				spellCheck={false}
				onChange={onChange}
				className={`input ${error && "error"} ${className}`}
				value={value}
				autoComplete="off"
				{...props}
			/>
		</div>
	);
}

export default InputWithError;
