import React from "react";
import { useAppDispatch } from "../../../../../redux/hooks";
import { setModalComponent } from "../../../../../redux/reducers/appSlice";
import "./NewColumn.scss";

function NewColumn() {
	const dispatch = useAppDispatch();

	const handleCLick = () =>
		dispatch(setModalComponent({ type: "CreateColumn" }));

	return (
		<button onClick={handleCLick} className="new-column">
			<h2>+ New Column</h2>
		</button>
	);
}

export default NewColumn;
