import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Board } from "../../utils/types/types";

interface BoardsState {
	boards: Board[] | null;
	selectedBoard: number;
}
export const initialState: BoardsState = {
	boards: null,
	selectedBoard: 0,
};

const boardsSlice = createSlice({
	name: "boards",
	initialState,
	reducers: {
		setBoards: (state, action: PayloadAction<Board[] | null>) => {
			state.boards = action.payload;
		},
		setSelectedBoard: (state, action: PayloadAction<number>) => {
			state.selectedBoard = action.payload;
		},
	},
});

export const { setBoards, setSelectedBoard } = boardsSlice.actions;

export const selectBoards = (state: RootState) => state.boards.boards;
export const selectSelectedBoard = (state: RootState) =>
	state.boards.selectedBoard;

export default boardsSlice.reducer;
