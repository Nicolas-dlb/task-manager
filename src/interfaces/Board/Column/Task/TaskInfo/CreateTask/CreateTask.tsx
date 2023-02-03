import { useState, useEffect, useContext, useMemo } from "react";
import useOutsideClick from "../../../../../../utils/hooks/useOutsideClick";
import "./CreateTask.scss";
import AddItemButton from "../../../../../../components/AddItemButton/AddItemButton";
import SelectStatus from "../../../../../../components/SelectStatus/SelectStatus";
import { subtasksT, TaskT } from "../../../../../../utils/types/types";
import { ModalContext } from "../../../../../../utils/providers/ModalProvider";
import useTasks from "../../../../../../utils/hooks/useTasks";
import {
	createSubtasks,
	uniqueId,
} from "../../../../../../utils/helpers/helpers";
import RemovableInput from "./SubtaskInput/RemovableInput";

interface CreateTaskProps {
	task?: TaskT;
}

function CreateTask({ task }: CreateTaskProps) {
	const [currentTask, setCurrentTask] = useState<TaskT>();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [subtasks, setSubtasks] = useState<subtasksT[]>([]);
	const [status, setStatus] = useState("");
	const { editTask, createTask } = useTasks();
	const { setModalComponent } = useContext(ModalContext);
	const ref = useOutsideClick(() => setModalComponent(null));

	useEffect(() => {
		if (task) {
			setTitle(task.title);
			setDescription(task.description);
			task.subtasks
				? setSubtasks(task.subtasks)
				: setSubtasks([...createSubtasks(2)]);
			setStatus(task.status);
		} else {
			setSubtasks([...createSubtasks(2)]);
		}
	}, [task]);

	const newTask = useMemo(() => {
		return {
			title,
			description,
			subtasks: subtasks.filter((subtask) => subtask.title),
			status,
			id: task ? task.id : uniqueId(),
		};
	}, [title, description, subtasks, status, task]);

	return (
		<div ref={ref} className="create-task">
			<h2>{task ? "Edit Task" : "Create Task"}</h2>
			<div className="create-task-property">
				<p className="create-task-label">Title</p>
				<input
					placeholder="e.g. Take coffee break"
					type="text"
					onChange={(e) => setTitle(e.target.value)}
					className="create-task-input"
					value={title}
				/>
			</div>
			<div className="create-task-property">
				<p className="create-task-label">Description</p>
				<textarea
					placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
					className="create-task-input"
					onChange={(e) => setDescription(e.target.value)}
					value={description}
				/>
			</div>
			<div className="create-task-property">
				<p className="create-task-label">Subtasks</p>
				{subtasks?.map((subtask, index) => (
					<RemovableInput
						key={index.toString()}
						state={subtask}
						setStates={setSubtasks}
					/>
				))}
			</div>
			<AddItemButton
				item="subtask"
				onClick={() => setSubtasks([...subtasks, ...createSubtasks(1)])}
			/>
			<div className="create-task-property">
				<p className="create-task-label">Status</p>
				<SelectStatus status={status} setStatus={setStatus} />
			</div>
			<button
				onClick={() => {
					if (task) {
						editTask(currentTask ? currentTask : task, newTask);
					} else {
						createTask(newTask);
					}
					setCurrentTask(newTask);
					setModalComponent(null);
				}}
				className="btn-create-task"
			>
				<h3>Create Task</h3>
			</button>
		</div>
	);
}

export default CreateTask;
