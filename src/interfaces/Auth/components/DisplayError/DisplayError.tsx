import React from "react";
import { FieldErrors } from "react-hook-form";
import { AuthValues } from "../../Login/Login";

interface DisplayErrorProps {
	errors: FieldErrors<AuthValues>;
	property: string;
}

function DisplayError({ errors, property }: DisplayErrorProps) {
	const error = errors[property as keyof typeof errors];

	if (!error) {
		return null;
	}

	return (
		<span role="alert" className="auth__form__label__error">
			{error?.message}
		</span>
	);
}

export default DisplayError;
