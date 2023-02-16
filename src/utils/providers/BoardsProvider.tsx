import {
	createContext,
	ReactNode,
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";
import { BoardI } from "../types/types";
import data from "../../data.json";
import { addIDToData } from "../helpers/helpers";

interface BoardsContextI {
	boards: BoardI[];
	setBoards: Dispatch<SetStateAction<BoardI[]>>;
	selectedBoard: BoardI;
	setSelectedBoard: Dispatch<SetStateAction<BoardI>>;
}

export const BoardsContext = createContext<BoardsContextI>({
	boards: [],
	setBoards: (board: BoardI[] | ((prevState: BoardI[]) => BoardI[])) => {},
	selectedBoard: { id: "", name: "", columns: [] },
	setSelectedBoard: (board: BoardI | ((prevState: BoardI) => BoardI)) => {},
});

function BoardsProvider({ children }: { children: ReactNode }) {
	const [boards, setBoards] = useState<BoardI[]>([]);
	const [selectedBoard, setSelectedBoard] = useState<BoardI>({
		id: "",
		name: "",
		columns: [],
	});

	useEffect(() => {
		const fetchedBoards = addIDToData(data);
		setBoards(fetchedBoards);
		setSelectedBoard(fetchedBoards[0]);
	}, []);

	useEffect(() => {
		selectedBoard?.id &&
			setSelectedBoard(
				boards.find((board) => board.id === selectedBoard.id) as BoardI
			);
	}, [boards]);

	return (
		<BoardsContext.Provider
			value={{
				selectedBoard,
				setSelectedBoard,
				boards,
				setBoards,
			}}
		>
			{children}
		</BoardsContext.Provider>
	);
}

export default BoardsProvider;
