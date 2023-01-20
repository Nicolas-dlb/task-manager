import { createContext, ReactNode } from "react";
import useLocalStorage from "use-local-storage";
import { ThemeContextI } from "../types/types";

export const ThemeContext = createContext<ThemeContextI>({
	theme: "dark",
	setTheme: (theme: string) => {},
});

function ThemeProvider({ children }: { children: ReactNode }) {
	const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const [theme, setTheme] = useLocalStorage(
		"theme",
		defaultDark ? "dark" : "light"
	);
	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export default ThemeProvider;
