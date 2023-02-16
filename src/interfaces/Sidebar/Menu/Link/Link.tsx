import { useContext } from "react";
import { BoardsContext } from "../../../../utils/providers/BoardsProvider";
import { BoardI } from "../../../../utils/types/types";
import { ReactComponent as BoardIcon } from "../../../../assets/icon-board.svg";
import "./Link.scss";

function Link({ board, onClick }: { board?: BoardI; onClick: () => void }) {
	const { selectedBoard } = useContext(BoardsContext);

	const isActive = selectedBoard?.id === board?.id;

	return (
		<button
			onClick={onClick}
			className={`link ${isActive && "active"} ${!board && "btn-create-board"}`}
		>
			<BoardIcon />
			<h3>{board?.name || "+ Create new board"}</h3>
		</button>
	);
}

export default Link;
