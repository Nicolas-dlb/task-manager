import React, {
	ChangeEvent,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import RemovableInput from "../../RemovableInput/RemovableInput";
import { createColumns, uniqueId } from "../../../utils/helpers/helpers";
import useOutsideClick from "../../../utils/hooks/useOutsideClick";
import { BoardsContext } from "../../../utils/providers/BoardsProvider";
import { ModalContext } from "../../../utils/providers/ModalProvider";
import { BoardI, ColumnT } from "../../../utils/types/types";
import "./CreateBoard.scss";
import ButtonCreate from "../../ButtonCreate/ButtonCreate";
import ButtonAdd from "../../ButtonAdd/ButtonAdd";
import InputWithError from "../../InputWithError/InputWithError";

interface CreateBoardProps {
	board?: BoardI;
}

function CreateBoard({ board }: CreateBoardProps) {
	const { setModalComponent } = useContext(ModalContext);
	const { setBoards, setSelectedBoard } = useContext(BoardsContext);
	const [name, setName] = useState(board?.name || "");
	const [nameError, setNameError] = useState(false);
	const [columns, setColumns] = useState<ColumnT[]>(
		board?.columns || createColumns(2)
	);
	const ref = useOutsideClick(() => setModalComponent(null));

	const newBoard = useMemo(() => {
		return {
			id: board ? board.id : uniqueId(),
			name,
			columns: columns.filter((column) => column.name),
		};
	}, [board, name, columns]);

	const createBoard = useCallback(() => {
		if (!name) {
			setNameError(true);
			return;
		}
		if (!board) {
			setBoards((prev) => [...prev, newBoard]);
			setSelectedBoard(newBoard);
		} else {
			setBoards((prev) =>
				prev.map((boardItem) =>
					boardItem.id === board.id ? newBoard : boardItem
				)
			);
		}
		setModalComponent(null);
	}, [board, name, newBoard, setBoards, setModalComponent, setSelectedBoard]);

	const addColumn = useCallback(
		() => setColumns([...columns, ...createColumns(1)]),
		[columns]
	);

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
		setName(e.target.value);

	const handleColumnChange = (newValue: string, index: number) =>
		setColumns((prev) =>
			prev.map((column, columnIndex) => {
				if (columnIndex === index) {
					column.name = newValue;
				}
				return column;
			})
		);

	const deleteColumn = useCallback(
		(index: number) =>
			setColumns((prev) =>
				prev.filter((item, itemIndex) => itemIndex !== index)
			),
		[]
	);

	useEffect(() => {
		nameError && name && setNameError(false);
	}, [name, nameError]);

	return (
		<div ref={ref} className="create-board">
			<h2>{board ? "Edit board" : "Add new board"}</h2>
			<div className="property">
				<label htmlFor="name">Board Name</label>
				<InputWithError
					value={name}
					error={nameError}
					onChange={handleNameChange}
					placeholder="e.g. Web Design"
				/>
			</div>
			<div className="property">
				<label>Board Columns</label>
				{columns?.map((column, index) => (
					<RemovableInput
						key={column.id}
						placeholder="e.g. Todo"
						value={column.name}
						index={index}
						onChange={handleColumnChange}
						onDelete={deleteColumn}
					/>
				))}
				<ButtonAdd item="column" onClick={addColumn} />
			</div>
			<ButtonCreate onClick={createBoard}>
				{board ? "Save Changes" : "Create Board"}
			</ButtonCreate>
		</div>
	);
}

export default CreateBoard;
