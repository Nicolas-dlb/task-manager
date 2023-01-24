import React from "react";
import "./Header.scss";
import logo from "../../assets/logo-mobile.svg";
import verticalEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import AddItemButton from "../../components/AddItemButton/AddItemButton";
import BoardTitle from "./BoardTitle/BoardTitle";

function Header(): JSX.Element {
	return (
		<header data-testid="header">
			<div className="header-content">
				<img src={logo} className="logo" width="24px" height="25px" alt="" />
				<BoardTitle />
			</div>
			<div className="header-content">
				<AddItemButton item="task" />
				<img src={verticalEllipsis} className="vertical-ellipsis" alt="" />
			</div>
		</header>
	);
}

export default Header;
