import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./interfaces/App/App";
import reportWebVitals from "./reportWebVitals";
import BoardsProvider from "./utils/providers/BoardsProviders";
import SidebarProvider from "./utils/providers/SidebarProvider";
import ThemeProvider from "./utils/providers/ThemeProvider";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<ThemeProvider>
			<SidebarProvider>
				<BoardsProvider>
					<App />
				</BoardsProvider>
			</SidebarProvider>
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
