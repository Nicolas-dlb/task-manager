import { render } from "@testing-library/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { Store } from "@reduxjs/toolkit";

function renderWithStore(children: ReactNode, customStore?: Store) {
	render(
		<Provider store={customStore ? customStore : store}>{children}</Provider>
	);
}

export default renderWithStore;
