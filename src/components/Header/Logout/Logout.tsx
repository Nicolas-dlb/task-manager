import React from "react";
import { ReactComponent as LogoutIcon } from "../../../assets/logout.svg";
import { useDispatch } from "react-redux";
import { setModalComponent } from "../../../redux/reducers/appSlice";
import "./Logout.scss";

function Logout() {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(setModalComponent({ type: "Disconnect" }));
	};

	return (
		<button
			aria-label="disconnect"
			className="btn__logout"
			onClick={handleClick}
		>
			<LogoutIcon className="header__logout" />
		</button>
	);
}

export default Logout;
