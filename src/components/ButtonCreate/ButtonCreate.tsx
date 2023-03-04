import React from "react";
import "./ButtonCreate.scss";

interface ButtonCreateProps {
	onClick?: any;
	children?: string;
}

function ButtonCreate({ children }: ButtonCreateProps) {
	return (
		<button type="submit" className="btn-create">
			<h3>{children}</h3>
		</button>
	);
}

export default ButtonCreate;
