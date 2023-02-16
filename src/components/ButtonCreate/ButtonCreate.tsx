import React from "react";
import "./ButtonCreate.scss";

interface ButtonCreateProps {
	onClick?: any;
	children?: string;
}

function ButtonCreate({ onClick, children }: ButtonCreateProps) {
	return (
		<button onClick={onClick} className="btn-create">
			<h3>{children}</h3>
		</button>
	);
}

export default ButtonCreate;
