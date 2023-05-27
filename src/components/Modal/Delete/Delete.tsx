import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Board, Task } from "../../../utils/types/types";
import {
	selectModalComponent,
	setModalComponent,
} from "../../../redux/reducers/appSlice";
import "./Delete.scss";

interface DeleteItemProps {
	onDelete: (id: string) => void;
}

function Delete({ onDelete }: DeleteItemProps) {
	const dispatch = useAppDispatch();
	const modalComponent = useAppSelector(selectModalComponent);
	const item = modalComponent.item;

	const isBoard = modalComponent.type?.includes("Board");
	const name = isBoard ? (item as Board).name : (item as Task).title;
	const type = isBoard ? "board" : "task";

	const deleteBoardWarning =
		"This action will remove all columns and tasks and cannot be reversed.";

	const deleteTaskWarning = "This action cannot be reversed.";

	const warning = isBoard ? deleteBoardWarning : deleteTaskWarning;

	const handleDeleteClick = () => {
		onDelete(item!.id);
		dispatch(setModalComponent({ type: null }));
	};

	const handleCancelClick = () => {
		dispatch(setModalComponent({ type: null }));
	};

	return (
		<div className="delete-modal">
			<h2 className="delete-modal__title">Delete this {type} ?</h2>
			<p className="delete-modal__message">
				Are you sure you want to delete the '{name}' {type} ? {warning}
			</p>
			<div className="delete-modal__buttons">
				<button onClick={handleDeleteClick} className="btn-delete">
					<h3>Delete</h3>
				</button>
				<button onClick={handleCancelClick} className="btn-cancel">
					<h3>Cancel</h3>
				</button>
			</div>
		</div>
	);
}

export default Delete;
