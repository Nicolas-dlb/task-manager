import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useState,
} from "react";
import ButtonCreate from "../../ButtonCreate/ButtonCreate";
import InputWithError from "../../InputWithError/InputWithError";
import { useAppDispatch } from "../../../redux/hooks";
import { setModalComponent } from "../../../redux/reducers/appSlice";
import { useBoard } from "../../../utils/hooks/useBoard";
import { Board } from "../../../utils/types/types";
import { COLUMN_NAMES_MAX_LENGTH } from "../../../../config";
import "./CreateColumn.scss";

function CreateIColumn() {
	const dispatch = useAppDispatch();
	const { board } = useBoard();
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const { updateBoard } = useBoard();

	const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	}, []);

	const createColumn = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!name) {
				setError(true);
				return;
			}

			let newBoard = structuredClone(board as Board);
			newBoard.columns.push({ id: crypto.randomUUID(), name, tasks: [] });
			updateBoard(newBoard);

			dispatch(setModalComponent({ type: null }));
		},
		[name, setModalComponent]
	);

	useEffect(() => {
		error && name && setError(false);
	}, [name, error]);

	return (
		<div className="create-column">
			<h3>Create column</h3>
			<form className="create-column__form" onSubmit={createColumn}>
				<InputWithError
					value={name}
					error={error}
					maxLength={COLUMN_NAMES_MAX_LENGTH}
					onChange={handleNameChange}
					placeholder="e.g Todo"
				/>
				<ButtonCreate type="submit">Create column</ButtonCreate>
			</form>
		</div>
	);
}

export default CreateIColumn;
