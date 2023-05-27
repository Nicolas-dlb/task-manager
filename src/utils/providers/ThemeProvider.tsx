import { createContext, ReactNode } from "react";
import useLocalStorage from "use-local-storage";

interface ThemeContextI {
	theme: string;
	switchTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextI>({
	theme: "dark",
	switchTheme: () => {},
});

function ThemeProvider({ children }: { children: ReactNode }) {
	const defaultLight = window.matchMedia(
		"(prefers-color-scheme: light)"
	).matches;
	const [theme, setTheme] = useLocalStorage(
		"theme",
		defaultLight ? "light" : "dark"
	);

	const switchTheme = () => setTheme(theme === "dark" ? "light" : "dark");

	return (
		<ThemeContext.Provider value={{ theme, switchTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export default ThemeProvider;
