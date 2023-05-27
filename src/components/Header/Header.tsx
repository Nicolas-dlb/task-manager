import { useCallback } from "react";
import logo from "../../assets/logo-mobile.svg";
import BoardTitle from "./BoardTitle/BoardTitle";
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd";
import { useAppDispatch } from "../../redux/hooks";
import { setModalComponent } from "../../redux/reducers/appSlice";
import Settings from "../Settings/Settings";
import { useBoard } from "../../utils/hooks/useBoard";
import { Board } from "../../utils/types/types";
import "./Header.scss";
import Logout from "./Logout/Logout";

function Header(): JSX.Element {
	const { board } = useBoard();
	const isBoardEmpty = !board?.columns.length;
	const dispatch = useAppDispatch();

	const openCreateTaskModal = useCallback(
		() => dispatch(setModalComponent({ type: "CreateTask" })),
		[]
	);

	return (
		<header data-testid="header">
			<div className="header__content">
				<img src={logo} className="logo" width="24px" height="25px" alt="" />
				<BoardTitle />
			</div>
			<div className="header__content">
				<ButtonAdd
					onClick={openCreateTaskModal}
					item="task"
					disabled={isBoardEmpty}
				/>
				<Logout />
				<Settings item={board as Board} />
			</div>
		</header>
	);
}

export default Header;
