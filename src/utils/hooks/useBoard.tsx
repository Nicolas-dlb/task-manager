import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAppSelector } from "../../redux/hooks";
import {
	selectBoards,
	selectSelectedBoard,
} from "../../redux/reducers/boardsSlice";
import { Board, Column } from "../types/types";
import { auth, db } from "../../firebaseConfig";

interface useBoardProps {
	board: Board | null;
	updateBoard: (newBoard: Board, id?: string) => void;
	createColumns: (number: number) => Column[];
}

export const useBoard = (): useBoardProps => {
	const boards = useAppSelector(selectBoards);
	const selectedBoardndex = useAppSelector(selectSelectedBoard);

	const board = boards ? boards[selectedBoardndex] : null;

	const updateBoard = async (newBoard: Board) => {
		const userRef = doc(db, "users", auth.currentUser!.uid);
		const docSnap = await getDoc(userRef);
		const userData = docSnap.data();
		const boards: Board[] = userData?.boards;
		let newBoards;

		newBoards = boards.map((board) => {
			if (board.id === newBoard.id) {
				return newBoard;
			}
			return board;
		});

		updateDoc(userRef, {
			boards: newBoards,
		});
	};

	const createColumns = (number: number): Column[] => {
		const columns = [];
		for (let i = 0; i < number; i++) {
			columns.push({ id: crypto.randomUUID(), name: "", tasks: [] });
		}
		return columns;
	};

	return { board, updateBoard, createColumns };
};
