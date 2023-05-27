import { ReactComponent as ShowIcon } from "../../../assets/icon-show-sidebar.svg";
import "./ButtonShowSidebar.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	selectSidebarOpen,
	setIsSidebarOpen,
} from "../../../redux/reducers/appSlice";

function ButtonShowSidebar() {
	const isSidebarOpen = useAppSelector(selectSidebarOpen);
	const dispatch = useAppDispatch();

	return (
		<button
			id="btn-show-sidebar"
			aria-label="show sidebar"
			tabIndex={isSidebarOpen ? -1 : 0}
			onClick={() => dispatch(setIsSidebarOpen(true))}
			className={`btn-show-sidebar ${!isSidebarOpen ? "show" : ""}`}
		>
			<ShowIcon />
		</button>
	);
}

export default ButtonShowSidebar;
