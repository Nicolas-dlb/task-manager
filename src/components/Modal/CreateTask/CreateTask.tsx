import {
	useState,
	useEffect,
	useMemo,
	ChangeEvent,
	useCallback,
	useId,
	FormEvent,
} from "react";
import SelectStatus from "../../SelectStatus/SelectStatus";
import { Subtask, Task } from "../../../utils/types/types";
import useTasks from "../../../utils/hooks/useTasks";
import RemovableInput from "../../RemovableInput/RemovableInput";
import ButtonCreate from "../../ButtonCreate/ButtonCreate";
import ButtonAdd from "../../ButtonAdd/ButtonAdd";
import InputWithError from "../../InputWithError/InputWithError";
import { useAppDispatch } from "../../../redux/hooks";
import { setModalComponent } from "../../../redux/reducers/appSlice";
import { DndContext, closestCenter } from "@dnd-kit/core";
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
import "./CreateTask.scss";
import {
	SUBTASK_TITLE_MAX_LENGTH,
	TASK_DESCRIPTION_MAX_LENGTH,
	TASK_TITLE_MAX_LENGTH,
} from "../../../../config";

interface CreateTaskProps {
	task?: Task;
}

function CreateTask({ task }: CreateTaskProps) {
	const { createSubtasks } = useTasks();
	const [title, setTitle] = useState(task?.title || "");
	const [titleError, setTitleError] = useState(false);
	const [description, setDescription] = useState(task?.description || "");
	const [subtasks, setSubtasks] = useState<Subtask[]>(
		task?.subtasks.length ? task?.subtasks : createSubtasks(2)
	);
	const [status, setStatus] = useState(task?.status ? task?.status : "");
	const { editTask, addTask } = useTasks();
	const dispatch = useAppDispatch();
	const id = useId();

	useEffect(() => {
		titleError && title && setTitleError(false);
	}, [title, titleError]);

	const newtask = useMemo(() => {
		return {
			title,
			description,
			subtasks: subtasks.filter((subtask) => subtask.title),
			status,
			id: task ? task.id : crypto.randomUUID(),
		};
	}, [title, description, subtasks, status, task]);

	const createTask = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!title) {
				setTitleError(true);
				return;
			}
			if (task) {
				editTask(task, newtask);
			} else {
				addTask(newtask);
			}

			dispatch(setModalComponent({ type: null }));
		},
		[addTask, editTask, newtask, setModalComponent, task, title]
	);

	const addSubtask = useCallback(
		() => setSubtasks([...subtasks, ...createSubtasks(1)]),
		[subtasks]
	);

	const handleTitleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
		[]
	);

	const handleDescriptionChange = useCallback(
		(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value),
		[]
	);

	const handleSubtaskChange = useCallback(
		(newValue: string, index: number) =>
			setSubtasks((prev) =>
				prev.map((item, itemIndex) => {
					if (itemIndex === index) {
						return { ...item, title: newValue };
					}
					return item;
				})
			),
		[]
	);

	const deleteSubtask = useCallback(
		(index: number) =>
			setSubtasks((prev) =>
				prev.filter((item, itemIndex) => itemIndex !== index)
			),
		[]
	);

	function handleDragEnd(event: any) {
		const { active, over } = event;

		if (active.id !== over.id) {
			setSubtasks((subtasks) => {
				const activeIndex = subtasks.findIndex((task) => task.id === active.id);
				const overIndex = subtasks.findIndex((task) => task.id === over.id);

				return arrayMove(subtasks, activeIndex, overIndex);
			});
		}
	}

	return (
		<div className="create-task">
			<h2>{task ? "Edit task" : "Create task"}</h2>

			<form className="create-task__form" onSubmit={createTask}>
				<div className="create-task__property">
					<label htmlFor={`${id}-title`} className="create-task__label">
						Title
					</label>
					<InputWithError
						error={titleError}
						placeholder="e.g. Take coffee break"
						value={title}
						onChange={handleTitleChange}
						id={`${id}-title`}
						maxLength={TASK_TITLE_MAX_LENGTH}
					/>
				</div>
				<div className="create-task__property">
					<label htmlFor={`${id}-description`} className="create-task__label">
						Description
					</label>
					<textarea
						placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
						spellCheck={false}
						className="create-task__description"
						onChange={handleDescriptionChange}
						value={description}
						id={`${id}-description`}
						maxLength={TASK_DESCRIPTION_MAX_LENGTH}
					/>
				</div>
				<div className="create-task__property">
					<label htmlFor="first-subtasks" className="create-task__label">
						Subtasks
					</label>

					<div className="create-task__subtasks">
						<DndContext
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
							modifiers={[restrictToVerticalAxis, restrictToParentElement]}
						>
							<SortableContext
								items={subtasks}
								strategy={verticalListSortingStrategy}
							>
								{subtasks?.map((subtask, index) => (
									<SortableItem key={subtask.id} id={subtask.id}>
										<RemovableInput
											id={index === 0 ? "first-subtasks" : undefined}
											placeholder="e.g. Take coffee break"
											value={subtask.title}
											index={index}
											maxLength={SUBTASK_TITLE_MAX_LENGTH}
											onChange={handleSubtaskChange}
											onDelete={deleteSubtask}
										/>
									</SortableItem>
								))}
							</SortableContext>
						</DndContext>
					</div>
				</div>
				<ButtonAdd
					disabled={subtasks.length > 6}
					item="subtask"
					onClick={addSubtask}
				/>
				<div className="create-task__property">
					<label htmlFor="status" className="create-task__label">
						Status
					</label>
					<SelectStatus status={status} setStatus={setStatus} />
				</div>
				<ButtonCreate type="submit">
					{task ? "Saves changes" : "Create task"}
				</ButtonCreate>
			</form>
		</div>
	);
}
export default CreateTask;
