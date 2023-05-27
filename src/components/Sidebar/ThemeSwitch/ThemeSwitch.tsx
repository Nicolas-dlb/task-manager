import "./ThemeSwitch.scss";
import { ReactComponent as LightThemeIcon } from "../../../assets/icon-light-theme.svg";
import { ReactComponent as DarkThemeIcon } from "../../../assets/icon-dark-theme.svg";
import Switch from "./Switch/Switch";

function ThemeSwitch() {
	return (
		<div className="theme-switch">
			<LightThemeIcon />
			<Switch />
			<DarkThemeIcon />
		</div>
	);
}

export default ThemeSwitch;
