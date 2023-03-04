import {
	ChangeEvent,
	FormEvent,
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

	const createColumn = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!name) {
				setError(true);
				return;
			}
			setSelectedBoard((prev) => {
				prev.columns.push({ id: uniqueId(), name, tasks: [] });
				return prev;
			});
			setModalComponent(null);
		},
		[name, setModalComponent, setSelectedBoard]
	);

	useEffect(() => {
		error && name && setError(false);
	}, [name, error]);

	return (
		<div ref={modal} className="create-column">
			<h3>Create Column</h3>
			<form className="create-column-form" onSubmit={createColumn}>
				<InputWithError
					value={name}
					error={error}
					onChange={handleNameChange}
					placeholder="e.g Todo"
				/>
				<ButtonCreate>Create column</ButtonCreate>
			</form>
		</div>
	);
}

export default CreateColumn;
