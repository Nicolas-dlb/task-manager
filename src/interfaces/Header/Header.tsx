import { useContext, useState } from "react";
import "./Header.scss";
import logo from "../../assets/logo-mobile.svg";
import verticalEllipsis from "../../assets/icon-vertical-ellipsis.svg";
import AddItemButton from "../../components/AddItemButton/AddItemButton";
import BoardTitle from "./BoardTitle/BoardTitle";
import { BoardsContext } from "../../utils/providers/BoardsProvider";
import CreateTask from "../Board/Column/Task/TaskInfo/CreateTask/CreateTask";
import { ModalContext } from "../../utils/providers/ModalProvider";

function Header(): JSX.Element {
	const { selectedBoard } = useContext(BoardsContext);
	const { setModalComponent } = useContext(ModalContext);

	return (
		<header data-testid="header">
			<div className="header-content">
				<img src={logo} className="logo" width="24px" height="25px" alt="" />
				<BoardTitle />
			</div>
			<div className="header-content">
				<AddItemButton
					onClick={() => setModalComponent(<CreateTask />)}
					item="task"
					disabled={
						selectedBoard && !selectedBoard!.columns.length ? true : false
					}
				/>

				<img
					src={verticalEllipsis}
					height="16px"
					width="3.6px"
					className="vertical-ellipsis"
					alt=""
				/>
			</div>
		</header>
	);
}

export default Header;
