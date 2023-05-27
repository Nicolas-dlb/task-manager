import React from "react";
import ButtonCreate from "../../../../components/ButtonCreate/ButtonCreate";
import { useAppDispatch } from "../../../../redux/hooks";
import { setModalComponent } from "../../../../redux/reducers/appSlice";
import "./EmptyBoard.scss";

interface EmptyBoardProps {
	newItem: "Board" | "Column";
}
function EmptyBoard({ newItem }: EmptyBoardProps) {
	const dispatch = useAppDispatch();

	const handleClick = () =>
		dispatch(setModalComponent({ type: `Create${newItem}` }));

	return (
		<section className="empty-board">
			<div className="empty-board__content">
				<h3>Create a new {newItem.toLowerCase()} to get started.</h3>
				<ButtonCreate onClick={handleClick}>+ Add New {newItem}</ButtonCreate>
			</div>
		</section>
	);
}

export default EmptyBoard;
