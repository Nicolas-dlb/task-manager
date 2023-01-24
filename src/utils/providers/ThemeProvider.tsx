import { createContext, ReactNode } from "react";
import useLocalStorage from "use-local-storage";
import { ThemeContextI } from "../types/types";

export const ThemeContext = createContext<ThemeContextI>({
	theme: "dark",
	switchTheme: () => {},
});

function ThemeProvider({ children }: { children: ReactNode }) {
	const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const [theme, setTheme] = useLocalStorage(
		"theme",
		defaultDark ? "dark" : "light"
	);

	const switchTheme = () => setTheme(theme === "dark" ? "light" : "dark");

	return (
		<ThemeContext.Provider value={{ theme, switchTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export default ThemeProvider;
