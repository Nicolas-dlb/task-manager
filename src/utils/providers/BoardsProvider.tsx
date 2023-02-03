import {
	createContext,
	ReactNode,
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from "react";
import { BoardI, TaskT } from "../types/types";
import data from "../../data.json";
import { addIDToData } from "../helpers/helpers";

interface BoardsContextI {
	boards: BoardI[] | null;
	setBoards: Dispatch<SetStateAction<BoardI[] | null>>;
	selectedBoard: BoardI | null;
	setSelectedBoard: Dispatch<SetStateAction<BoardI | null>>;
	selectedTask: TaskT | null;
	setSelectedTask: Dispatch<SetStateAction<TaskT | null>>;
}

export const BoardsContext = createContext<BoardsContextI>({
	boards: null,
	setBoards: (
		board: BoardI[] | null | ((prevState: BoardI[] | null) => BoardI[] | null)
	) => {},
	selectedBoard: null,
	setSelectedBoard: (
		board: BoardI | null | ((prevState: BoardI | null) => BoardI | null)
	) => {},
	selectedTask: null,
	setSelectedTask: (
		board: TaskT | null | ((prevState: TaskT | null) => TaskT | null)
	) => {},
});

function BoardsProvider({ children }: { children: ReactNode }) {
	const [boards, setBoards] = useState<BoardI[] | null>(null);
	const [selectedBoard, setSelectedBoard] = useState<BoardI | null>(null);
	const [selectedTask, setSelectedTask] = useState<TaskT | null>(null);

	useEffect(() => {
		const fetchedBoards = addIDToData(data);
		setBoards(fetchedBoards);
		setSelectedBoard(fetchedBoards[0]);
	}, []);

	return (
		<BoardsContext.Provider
			value={{
				selectedBoard,
				setSelectedBoard,
				boards,
				setBoards,
				selectedTask,
				setSelectedTask,
			}}
		>
			{children}
		</BoardsContext.Provider>
	);
}

export default BoardsProvider;
