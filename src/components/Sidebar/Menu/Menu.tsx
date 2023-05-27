import Link from "./Link/Link";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	selectBoards,
	setSelectedBoard,
} from "../../../redux/reducers/boardsSlice";
import { Board } from "../../../utils/types/types";
import {
	setIsSidebarOpen,
	setModalComponent,
} from "../../../redux/reducers/appSlice";
import { useWindowSize } from "usehooks-ts";
import { useCallback } from "react";
import "./Menu.scss";

function Menu() {
	const boards = useAppSelector(selectBoards);
	const dispatch = useAppDispatch();
	const { width } = useWindowSize();
	const isMobile = width < 1220;

	const handleNewBoardClick = useCallback(() => {
		dispatch(setModalComponent({ type: "CreateBoard" }));
		isMobile && dispatch(setIsSidebarOpen(false));
	}, [isMobile]);

	const handleBoardClick = useCallback(
		(index: number) => dispatch(setSelectedBoard(index)),
		[]
	);

	const maximumBoardsReached = boards ? boards!.length > 7 : false;

	return (
		<div className="menu">
			<h4 className="menu__title">ALL BOARDS ({boards?.length})</h4>
			<nav>
				{boards?.map((board: Board, index: number) => (
					<Link
						key={index}
						onClick={() => handleBoardClick(index)}
						name={board.name}
						id={board.id}
					/>
				))}
				<Link onClick={handleNewBoardClick} isDisabled={maximumBoardsReached} />
			</nav>
		</div>
	);
}

export default Menu;
