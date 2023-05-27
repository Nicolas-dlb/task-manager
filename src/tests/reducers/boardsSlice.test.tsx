import boardsReducer, {
	initialState,
	setBoards,
	setSelectedBoard,
	selectBoards,
	selectSelectedBoard,
} from "../../redux/reducers/boardsSlice";
import { RootState } from "../../redux/store";

describe("boards reducer", () => {
	test("should handle setBoards", () => {
		const boards = [
			{ id: "1", name: "Board 1", columns: [] },
			{ id: "2", name: "Board 2", columns: [] },
		];
		const newState = boardsReducer(initialState, setBoards(boards));
		expect(newState.boards).toEqual(boards);
	});

	test("should handle setSelectedBoard", () => {
		const selectedBoard = 2;
		const newState = boardsReducer(
			initialState,
			setSelectedBoard(selectedBoard)
		);
		expect(newState.selectedBoard).toEqual(selectedBoard);
	});
});

describe("boards selectors", () => {
	const state: RootState = {
		app: { isSidebarOpen: false, modalComponent: { type: "Sidebar" } },
		boards: {
			boards: [
				{ id: "1", name: "Board 1", columns: [] },
				{ id: "2", name: "Board 2", columns: [] },
			],
			selectedBoard: 0,
		},
	};

	test("should return the boards array", () => {
		const boards = selectBoards(state);
		expect(boards).toEqual([
			{ id: "1", name: "Board 1", columns: [] },
			{ id: "2", name: "Board 2", columns: [] },
		]);
	});

	test("should return the selected board", () => {
		const selectedBoard = selectSelectedBoard(state);
		expect(selectedBoard).toEqual(0);
	});
});
