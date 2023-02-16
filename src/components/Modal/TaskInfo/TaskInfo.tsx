import React, { useState, useEffect, useContext } from "react";
import verticalEllipsis from "../../../assets/icon-vertical-ellipsis.svg";
import "./TaskInfo.scss";
import Subtask from "./Subtask/Subtask";
import CreateTask from "../CreateTask/CreateTask";
import SelectStatus from "../../SelectStatus/SelectStatus";
import { ModalContext } from "../../../utils/providers/ModalProvider";
import useOutsideClick from "../../../utils/hooks/useOutsideClick";
import useTasks from "../../../utils/hooks/useTasks";
import { TaskT } from "../../../utils/types/types";

interface TaskInfoProps {
	task: TaskT;
}

function TaskInfo({ task }: TaskInfoProps) {
	const { setModalComponent } = useContext(ModalContext);
	const [status, setStatus] = useState(task?.status);
	const { editTask } = useTasks();
	const [currentTask, setCurrentTask] = useState<TaskT>(task);
	const ref = useOutsideClick(() => setModalComponent(null));

	const completedSubtasksLength = currentTask?.subtasks.filter(
		(subtask) => subtask.isCompleted
	).length;
	const subtasksLength = currentTask!.subtasks.length;

	useEffect(() => {
		if (status !== currentTask.status) {
			const newTask = { ...currentTask, status };
			editTask(currentTask, newTask);
			setCurrentTask(newTask);
		}
	}, [currentTask, editTask, status]);

	const openEditTaskModal = () =>
		setModalComponent(<CreateTask task={currentTask} />);

	const displayCompletedSubtasksNumber = !task.subtasks.length
		? "No subtasks"
		: `Subtask${subtasksLength > 1 ? "s" : ""} (${completedSubtasksLength} 
				of ${subtasksLength})`;

	return (
		<div ref={ref} className="task-info">
			<div className="task-info-header">
				<h3>{currentTask?.title}</h3>
				<img
					src={verticalEllipsis}
					onClick={openEditTaskModal}
					className="vertical-ellipsis"
					height="16px"
					width="3.6px"
					alt=""
				/>
			</div>
			<p className="task-info-description">{task.description}</p>
			<h3 className="task-info-label">{displayCompletedSubtasksNumber}</h3>
			<div className="task-info-subtasks">
				{task.subtasks.map((subtask) => (
					<Subtask
						key={subtask.id}
						subtask={subtask}
						currentTask={currentTask}
						setCurrentTask={setCurrentTask}
					/>
				))}
			</div>
			<h3 className="task-info-label">Current Status</h3>
			<SelectStatus status={status} setStatus={setStatus} />
		</div>
	);
}

export default TaskInfo;
