import React, { ReactNode } from "react";
import { store } from "../../redux/store";
import { Provider } from "react-redux";

interface StoreProviderProps {
	children: ReactNode;
}

function StoreProvider({ children }: StoreProviderProps) {
	return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
