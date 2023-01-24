import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from "react";
import { BoardI } from "../types/types";

interface BoardsContextI {
	selectedBoard: BoardI | null;
	setSelectedBoard: Dispatch<SetStateAction<BoardI | null>>;
}

export const BoardsContext = createContext<BoardsContextI>({
	selectedBoard: null,
	setSelectedBoard: (
		board: BoardI | null | ((prevState: BoardI | null) => BoardI | null)
	) => {},
});

function BoardsProvider({ children }: { children: ReactNode }) {
	const [selectedBoard, setSelectedBoard] = useState<BoardI | null>(null);

	return (
		<BoardsContext.Provider value={{ selectedBoard, setSelectedBoard }}>
			{children}
		</BoardsContext.Provider>
	);
}

export default BoardsProvider;
