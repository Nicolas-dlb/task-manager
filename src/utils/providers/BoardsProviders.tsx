import { createContext, ReactNode, useEffect, useState } from "react";
import { BoardI, BoardsContextI } from "../types/types";
import data from "./data.json";

export const BoardsContext = createContext<BoardsContextI>({
	boards: null,
	setBoards: (
		board: BoardI[] | null | ((prevState: BoardI[] | null) => BoardI[] | null)
	) => {},
	selectedBoard: null,
	setSelectedBoard: (
		board: BoardI | null | ((prevState: BoardI | null) => BoardI | null)
	) => {},
});

function BoardsProvider({ children }: { children: ReactNode }) {
	const [boards, setBoards] = useState<BoardI[] | null>(null);
	const [selectedBoard, setSelectedBoard] = useState<BoardI | null>(null);

	useEffect(() => {
		setBoards(data.boards);
		setSelectedBoard(data.boards[0]);
	}, []);

	return (
		<BoardsContext.Provider
			value={{ selectedBoard, setSelectedBoard, boards, setBoards }}
		>
			{children}
		</BoardsContext.Provider>
	);
}

export default BoardsProvider;
