import { useCallback, useContext } from "react";
import CreateBoard from "../../../components/Modal/CreateBoard/CreateBoard";
import { BoardsContext } from "../../../utils/providers/BoardsProvider";
import { ModalContext } from "../../../utils/providers/ModalProvider";
import Link from "./Link/Link";
import "./Menu.scss";

function Menu() {
	const { boards, setSelectedBoard } = useContext(BoardsContext);
	const { setModalComponent } = useContext(ModalContext);

	const openCreateBoardModal = useCallback(
		() => setModalComponent(<CreateBoard />),
		[setModalComponent]
	);

	return (
		<div className="menu">
			<h4 className="menu-title">ALL BOARDS ({boards?.length})</h4>
			<nav>
				{boards?.map((board) => (
					<Link
						key={board.id}
						onClick={() => setSelectedBoard(board)}
						board={board}
					/>
				))}
				<Link onClick={openCreateBoardModal} />
			</nav>
		</div>
	);
}

export default Menu;
