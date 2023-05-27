import { useAppSelector } from "../../../redux/hooks";
import { selectSidebarOpen } from "../../../redux/reducers/appSlice";
import EmptyBoard from "./EmptyBoard/EmptyBoard";
import Columns from "./Columns/Columns";
import { useBoard } from "../../../utils/hooks/useBoard";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import "./Board.scss";

function Board() {
	const isSidebarOpen = useAppSelector(selectSidebarOpen);
	const { board } = useBoard();

	return (
		<section tabIndex={-1} className={`board ${!isSidebarOpen && "close"}`}>
			{board?.columns.length ? (
				<Columns />
			) : board ? (
				<EmptyBoard newItem="Column" />
			) : board === null ? (
				<LoadingScreen />
			) : (
				<EmptyBoard newItem="Board" />
			)}
		</section>
	);
}

export default Board;
