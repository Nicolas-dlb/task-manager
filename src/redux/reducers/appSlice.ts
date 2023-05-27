import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Board, Column, Task } from "../../utils/types/types";

type ModalComponentState = {
	type: string | null;
	item?: Board | Column | Task;
};

interface AppState {
	isSidebarOpen: boolean;
	modalComponent: ModalComponentState;
}

const initialState: AppState = {
	isSidebarOpen: false,
	modalComponent: { type: null },
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setIsSidebarOpen: (state: AppState, action: PayloadAction<boolean>) => {
			state.isSidebarOpen = action.payload;
		},
		setModalComponent: (
			state: AppState,
			action: PayloadAction<ModalComponentState>
		) => {
			state.modalComponent = action.payload;
		},
	},
});

export const { setIsSidebarOpen, setModalComponent } = appSlice.actions;

export const selectSidebarOpen = (state: RootState) => state.app.isSidebarOpen;
export const selectModalComponent = (state: RootState) =>
	state.app.modalComponent;

export default appSlice.reducer;
