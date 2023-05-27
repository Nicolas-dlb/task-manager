import React, { MouseEventHandler } from "react";
import "./ButtonCreate.scss";

interface ButtonCreateProps {
	type?: "button" | "submit" | "reset";
	onClick?: MouseEventHandler<HTMLButtonElement>;
	children?: string | string[];
	className?: string;
}

function ButtonCreate({
	children,
	type,
	onClick,
	className,
}: ButtonCreateProps) {
	return (
		<button type={type} onClick={onClick} className={`btn-create ${className}`}>
			<h3>{children}</h3>
		</button>
	);
}

export default ButtonCreate;
