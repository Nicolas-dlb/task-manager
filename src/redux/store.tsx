import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./reducers/boardsSlice";
import appSlice from "./reducers/appSlice";

export const createStore = () =>
	configureStore({
		reducer: {
			app: appSlice,
			boards: boardsSlice,
		},
	});

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
