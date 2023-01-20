import { useContext } from "react";
import { ThemeContext } from "../../utils/providers/ThemeProvider";
import "./App.css";

function App(): JSX.Element {
	const { theme } = useContext(ThemeContext);

	return <div className="app" data-theme={theme}></div>;
}

export default App;
