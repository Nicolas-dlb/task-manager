import { ReactComponent as BoardIcon } from "../../../../assets/icon-board.svg";
import { useAppSelector } from "../../../../redux/hooks";
import { selectSidebarOpen } from "../../../../redux/reducers/appSlice";
import { useBoard } from "../../../../utils/hooks/useBoard";
import { memo } from "react";
import "./Link.scss";

interface LinkProps {
	id?: string;
	name?: string;
	onClick: () => void;
	isDisabled?: boolean;
}

function Link({ name, id, onClick, isDisabled }: LinkProps) {
	const isSidebarOpen = useAppSelector(selectSidebarOpen);
	const { board } = useBoard();
	const isActive = board?.id === id;

	return (
		<button
			disabled={isDisabled}
			tabIndex={!isSidebarOpen ? -1 : 0}
			onClick={onClick}
			className={`link ${isActive && "active"} ${!name && "btn-create-board"}`}
		>
			<BoardIcon />
			<h3>{name || "+ Create new board"}</h3>
		</button>
	);
}

export default memo(Link);
