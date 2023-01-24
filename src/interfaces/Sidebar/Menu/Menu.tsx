import React, { useContext } from "react";
import { ReactComponent as BoardIcon } from "../../../assets/icon-board.svg";
import { BoardsContext } from "../../../utils/providers/BoardsProviders";
import "./Menu.scss";

function Menu() {
	const { selectedBoard, setSelectedBoard, boards } = useContext(BoardsContext);

	return (
		<div className="menu">
			<h4 className="menu-title">ALL BOARDS ({boards?.length})</h4>
			<nav>
				{boards?.map((board: any, index) => (
					<button
						onClick={() => setSelectedBoard(board)}
						key={index.toString()}
						className={`menu-item ${
							selectedBoard?.name === board.name && "active"
						}`}
					>
						<BoardIcon />
						<h3>{board.name}</h3>
					</button>
				))}
				<button className="menu-item btn-create-board">
					<BoardIcon />
					<h3>+ Create new board</h3>
				</button>
			</nav>
		</div>
	);
}

export default Menu;
