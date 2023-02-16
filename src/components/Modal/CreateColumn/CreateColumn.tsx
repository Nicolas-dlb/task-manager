import React, {
	ChangeEvent,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { uniqueId } from "../../../utils/helpers/helpers";
import useOutsideClick from "../../../utils/hooks/useOutsideClick";
import { BoardsContext } from "../../../utils/providers/BoardsProvider";
import { ModalContext } from "../../../utils/providers/ModalProvider";
import ButtonCreate from "../../ButtonCreate/ButtonCreate";
import InputWithError from "../../InputWithError/InputWithError";
import "./CreateColumn.scss";

function CreateColumn() {
	const { setSelectedBoard } = useContext(BoardsContext);
	const { setModalComponent } = useContext(ModalContext);
	const modal = useOutsideClick(() => setModalComponent(null));
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	}, []);

	const createColumn = useCallback(() => {
		if (!name) {
			setError(true);
			return;
		}
		setSelectedBoard((prev) => {
			prev.columns.push({ id: uniqueId(), name, tasks: [] });
			return prev;
		});
		setModalComponent(null);
	}, [name, setModalComponent, setSelectedBoard]);

	useEffect(() => {
		error && name && setError(false);
	}, [name, error]);

	return (
		<div ref={modal} className="create-column">
			<h3>Create Column</h3>
			<InputWithError
				value={name}
				error={error}
				onChange={handleNameChange}
				placeholder="e.g Todo"
			/>
			<ButtonCreate onClick={createColumn}>Create column</ButtonCreate>
		</div>
	);
}

export default CreateColumn;
