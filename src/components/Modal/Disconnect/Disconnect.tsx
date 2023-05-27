import React from "react";
import { useDispatch } from "react-redux";
import { setModalComponent } from "../../../redux/reducers/appSlice";
import { auth } from "../../../firebaseConfig";
import { setSelectedBoard } from "../../../redux/reducers/boardsSlice";
import "./Disconnect.scss";

function Disconnect() {
	const dispatch = useDispatch();

	const handleDisconnectClick = () => {
		auth.signOut();
		setTimeout(() => {
			dispatch(setModalComponent({ type: null }));
			dispatch(setSelectedBoard(0));
		}, 100);
	};

	const handleCancelClick = () => {
		dispatch(setModalComponent({ type: null }));
	};

	return (
		<div className="disconnect">
			<h2 className="disconnect__title">
				Are you sure you want to disconnect ?
			</h2>
			<p className="disconnect__message">
				Your boards will be saved and retrieved the next time you log in.
			</p>
			<div className="disconnect__buttons">
				<button
					onClick={handleDisconnectClick}
					className="btn-disconnect"
					aria-label="disconnect"
				>
					<h3>Disconnect</h3>
				</button>
				<button
					onClick={handleCancelClick}
					className="btn-cancel"
					aria-label="cancel"
				>
					<h3>Cancel</h3>
				</button>
			</div>
		</div>
	);
}

export default Disconnect;
