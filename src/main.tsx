import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StoreProvider from "./utils/providers/StoreProvider";
import ThemeProvider from "./utils/providers/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import AuthChecker from "./utils/providers/AuthChecker";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<BrowserRouter>
			<StoreProvider>
				<ThemeProvider>
					<AuthChecker>
						<App />
					</AuthChecker>
				</ThemeProvider>
			</StoreProvider>
		</BrowserRouter>
	</StrictMode>
);
