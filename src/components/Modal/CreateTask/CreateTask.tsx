import {
	useState,
	useEffect,
	useContext,
	useMemo,
	ChangeEvent,
	useCallback,
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
	const [currentTask, setCurrentTask] = useState<TaskT | undefined>(task);
	const [title, setTitle] = useState(task?.title || "");
	const [titleError, setTitleError] = useState(false);
	const [description, setDescription] = useState(task?.description || "");
	const [subtasks, setSubtasks] = useState<SubtaskT[]>(
		task?.subtasks || createSubtasks(2)
	);
	const [status, setStatus] = useState(task?.status || "");
	const { editTask, addTask } = useTasks();
	const { setModalComponent } = useContext(ModalContext);
	const ref = useOutsideClick(() => setModalComponent(null));

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

	const createTask = useCallback(() => {
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
	}, [addTask, currentTask, editTask, newTask, setModalComponent, task, title]);

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
	console.log("create task render");
	return (
		<div ref={ref} className="create-task">
			<h2>{task ? "Edit Task" : "Create Task"}</h2>
			<div className="create-task-property">
				<p className="create-task-label">Title</p>
				<InputWithError
					error={titleError}
					placeholder="e.g. Take coffee break"
					value={title}
					onChange={handleTitleChange}
				/>
			</div>
			<div className="create-task-property">
				<p className="create-task-label">Description</p>
				<textarea
					placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
					spellCheck={false}
					className="create-task-description"
					onChange={handleDescriptionChange}
					value={description}
				/>
			</div>
			<div className="create-task-property">
				<p className="create-task-label">Subtasks</p>
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
			<ButtonCreate onClick={createTask}>Create Task</ButtonCreate>
		</div>
	);
}

export default CreateTask;
