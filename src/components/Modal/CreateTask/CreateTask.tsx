import {
	useState,
	useEffect,
	useContext,
	useMemo,
	ChangeEvent,
	useCallback,
	useId,
} from "react";
import useOutsideClick from "../../../utils/hooks/useOutsideClick";
import "./CreateTask.scss";
import SelectStatus from "../../SelectStatus/SelectStatus";
import { SubtaskT, TaskT } from "../../../utils/types/types";
import { ModalContext } from "../../../utils/providers/ModalProvider";
import useTasks from "../../../utils/hooks/useTasks";
import { createSubtasks, uniqueId } from "../../../utils/helpers/helpers";
import RemovableInput from "../../RemovableInput/RemovableInput";
import ButtonCreate from "../../ButtonCreate/ButtonCreate";
import ButtonAdd from "../../ButtonAdd/ButtonAdd";
import InputWithError from "../../InputWithError/InputWithError";

interface CreateTaskProps {
	task?: TaskT;
}

function CreateTask({ task }: CreateTaskProps) {
	const [currentTask, setCurrentTask] = useState<TaskT>();
	const [title, setTitle] = useState(task?.title || "");
	const [titleError, setTitleError] = useState(false);
	const [description, setDescription] = useState(task?.description || "");
	const [subtasks, setSubtasks] = useState<SubtaskT[]>(
		task?.subtasks.length ? task?.subtasks : () => createSubtasks(2)
	);
	const [status, setStatus] = useState(task?.status ? task?.status : "");
	const { editTask, addTask } = useTasks();
	const { setModalComponent } = useContext(ModalContext);

	const ref = useOutsideClick(() => setModalComponent(null));

	const id = useId();

	useEffect(() => {
		titleError && title && setTitleError(false);
	}, [title, titleError]);

	const newTask = useMemo(() => {
		return {
			title,
			description,
			subtasks: subtasks.filter((subtask) => subtask.title),
			status,
			id: task ? task.id : uniqueId(),
		};
	}, [title, description, subtasks, status, task]);

	const createTask = useCallback(
		(e: any) => {
			e.preventDefault();
			if (!title) {
				setTitleError(true);
				return;
			}
			if (task) {
				editTask(currentTask ? currentTask : task, newTask);
			} else {
				addTask(newTask);
			}
			setCurrentTask(newTask);
			setModalComponent(null);
		},
		[addTask, currentTask, editTask, newTask, setModalComponent, task, title]
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
						item.title = newValue;
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

	return (
		<div ref={ref} className="create-task">
			<h2>{task ? "Edit Task" : "Create Task"}</h2>

			<form className="create-task-form" onSubmit={createTask}>
				<div className="create-task-property">
					<label htmlFor={`${id}-title`} className="create-task-label">
						Title
					</label>
					<InputWithError
						error={titleError}
						placeholder="e.g. Take coffee break"
						value={title}
						onChange={handleTitleChange}
						id={`${id}-title`}
					/>
				</div>
				<div className="create-task-property">
					<label htmlFor={`${id}-description`} className="create-task-label">
						Description
					</label>
					<textarea
						placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
						spellCheck={false}
						className="create-task-description"
						onChange={handleDescriptionChange}
						value={description}
						id={`${id}-description`}
					/>
				</div>
				<div className="create-task-property">
					<label className="create-task-label">Subtasks</label>
					{subtasks?.map((subtask, index) => (
						<RemovableInput
							key={subtask.id}
							placeholder="e.g. Take coffee break"
							value={subtask.title}
							index={index}
							onChange={handleSubtaskChange}
							onDelete={deleteSubtask}
						/>
					))}
				</div>
				<ButtonAdd item="subtask" onClick={addSubtask} />
				<div className="create-task-property">
					<p className="create-task-label">Status</p>
					<SelectStatus status={status} setStatus={setStatus} />
				</div>
				<ButtonCreate>Create Task</ButtonCreate>
			</form>
		</div>
	);
}

export default CreateTask;
