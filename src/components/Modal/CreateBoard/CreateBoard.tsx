import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import RemovableInput from "../../RemovableInput/RemovableInput";
import { Board, Column } from "../../../utils/types/types";
import ButtonCreate from "../../ButtonCreate/ButtonCreate";
import ButtonAdd from "../../ButtonAdd/ButtonAdd";
import InputWithError from "../../InputWithError/InputWithError";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	setBoards,
	setSelectedBoard,
} from "../../../redux/reducers/boardsSlice";
import { setModalComponent } from "../../../redux/reducers/appSlice";
import { selectBoards } from "../../../redux/reducers/boardsSlice";
import { useBoard } from "../../../utils/hooks/useBoard";
import useBoards from "../../../utils/hooks/useBoards";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../../SortableItem/SortableItem";
import {
	restrictToParentElement,
	restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import "./CreateBoard.scss";
import {
	BOARD_NAMES_MAX_LENGTH,
	COLUMN_NAMES_MAX_LENGTH,
} from "../../../../config";

interface CreateBoardProps {
	board?: Board;
}

function CreateBoard({ board }: CreateBoardProps) {
	const boards = useAppSelector(selectBoards);
	const { addBoard } = useBoards();
	const { createColumns } = useBoard();
	const dispatch = useAppDispatch();
	const [name, setName] = useState(board?.name || "");
	const [nameError, setNameError] = useState(false);
	const [columns, setColumns] = useState<Column[]>(
		board?.columns || createColumns(2)
	);
	const { updateBoard } = useBoard();

	const newBoard = useMemo(() => {
		return {
			id: board ? board.id : crypto.randomUUID(),
			name,
			columns: columns.filter((column) => column.name),
		};
	}, [board, name, columns]);

	const createBoard = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!name) {
				setNameError(true);
				return;
			}

			if (!board) {
				addBoard(newBoard);
				dispatch(setSelectedBoard(boards!.length));
			} else {
				updateBoard(newBoard);
			}

			dispatch(setModalComponent({ type: null }));
		},
		[board, name, newBoard, setBoards, setModalComponent, setSelectedBoard]
	);

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
				prev.filter((column, columnIndex) => columnIndex !== index)
			),
		[]
	);

	useEffect(() => {
		nameError && name && setNameError(false);
	}, [name, nameError]);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (active.id !== over?.id) {
			setColumns((columns) => {
				const activeIndex = columns.findIndex(
					(column) => column.id === active.id
				);
				const overIndex = columns.findIndex((column) => column.id === over?.id);

				return arrayMove(columns, activeIndex, overIndex);
			});
		}
	}

	return (
		<div className="create-board">
			<h2>{board ? "Edit board" : "Add new board"}</h2>
			<form className="create-board__form" onSubmit={createBoard}>
				<div className="create-board__property">
					<label htmlFor="name">Board Name</label>
					<InputWithError
						id="name"
						value={name}
						error={nameError}
						maxLength={BOARD_NAMES_MAX_LENGTH}
						onChange={handleNameChange}
						placeholder="e.g. Web Design"
					/>
				</div>
				<div className="create-board__property">
					<label htmlFor="first-column">Board columns</label>
					<div className="create-board__columns">
						<DndContext
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
							modifiers={[restrictToVerticalAxis, restrictToParentElement]}
						>
							<SortableContext
								items={columns}
								strategy={verticalListSortingStrategy}
							>
								{columns?.map((column, index) => (
									<SortableItem key={column.id} id={column.id}>
										<RemovableInput
											id={index === 0 ? "first-column" : undefined}
											placeholder="e.g. Todo"
											value={column.name}
											index={index}
											maxLength={COLUMN_NAMES_MAX_LENGTH}
											onChange={handleColumnChange}
											onDelete={deleteColumn}
										/>
									</SortableItem>
								))}
							</SortableContext>
						</DndContext>
					</div>
					<ButtonAdd
						disabled={columns.length > 7}
						className="btn-add-column"
						item="column"
						onClick={addColumn}
					/>
				</div>
				<ButtonCreate type="submit">
					{board ? "Save Changes" : "Create Board"}
				</ButtonCreate>
			</form>
		</div>
	);
}

export default CreateBoard;
