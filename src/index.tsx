import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./interfaces/App/App";
import reportWebVitals from "./reportWebVitals";
import BoardsProvider from "./utils/providers/BoardsProvider";
import ModalProvider from "./utils/providers/ModalProvider";
import SidebarProvider from "./utils/providers/SidebarProvider";
import ThemeProvider from "./utils/providers/ThemeProvider";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<ThemeProvider>
		<SidebarProvider>
			<BoardsProvider>
				<ModalProvider>
					<App />
				</ModalProvider>
			</BoardsProvider>
		</SidebarProvider>
	</ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
