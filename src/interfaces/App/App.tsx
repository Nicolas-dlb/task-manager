import { useContext } from "react";

import { ThemeContext } from "../../utils/providers/ThemeProvider";
import Header from "../Header/Header";
import "./App.css";

function App(): JSX.Element {
	const { theme } = useContext(ThemeContext);

	return (
		<div className="app" data-theme={theme}>
			<Header />
		</div>
	);
}

export default App;
