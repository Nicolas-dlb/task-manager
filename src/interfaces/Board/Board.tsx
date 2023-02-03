import React, { useContext } from "react";
import { BoardsContext } from "../../utils/providers/BoardsProvider";
import { SidebarContext } from "../../utils/providers/SidebarProvider";
import "./Board.scss";
import Column from "./Column/Column";

function Board() {
	const { isSidebarOpen } = useContext(SidebarContext);
	const { selectedBoard } = useContext(BoardsContext);

	return (
		<div className={`board ${!isSidebarOpen && "close"}`}>
			{selectedBoard?.columns.map((column, index) => (
				<Column key={index.toString()} column={column} />
			))}
		</div>
	);
}

export default Board;
