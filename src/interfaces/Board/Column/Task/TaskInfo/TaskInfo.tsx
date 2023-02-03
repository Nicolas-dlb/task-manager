import React, { useState, useEffect, useContext } from "react";
import verticalEllipsis from "../../../../../assets/icon-vertical-ellipsis.svg";
import "./TaskInfo.scss";
import Subtask from "./Subtask/Subtask";
import CreateTask from "./CreateTask/CreateTask";
import SelectStatus from "../../../../../components/SelectStatus/SelectStatus";
import { ModalContext } from "../../../../../utils/providers/ModalProvider";
import useOutsideClick from "../../../../../utils/hooks/useOutsideClick";
import useTasks from "../../../../../utils/hooks/useTasks";
import { TaskT } from "../../../../../utils/types/types";

function TaskInfo({ task }: { task: TaskT }) {
	const { setModalComponent } = useContext(ModalContext);
	const ref = useOutsideClick(() => setModalComponent(null));
	const [status, setStatus] = useState(task?.status);
	const { editTask } = useTasks();
	const [currentTask, setCurrentTask] = useState<TaskT>();
	const completedSubtasks = currentTask?.subtasks.filter(
		(subtask) => subtask.isCompleted
	).length;
	const subtasks = currentTask?.subtasks.length;

	useEffect(() => {
		!status && setStatus(task.status);
	}, []);

	useEffect(() => {
		if (currentTask) {
			const newTask = { ...currentTask, status };
			editTask(currentTask, newTask);
			setCurrentTask(newTask);
		} else {
			const newTask = { ...task, status };
			status &&
				status !== task?.status &&
				editTask(currentTask ? currentTask : task, newTask);
			setCurrentTask(newTask);
		}
	}, [status]);

	return (
		<div ref={ref} className="task-info">
			<div className="task-info-header">
				<h3>{currentTask?.title}</h3>
				<img
					src={verticalEllipsis}
					onClick={() => setModalComponent(<CreateTask task={currentTask} />)}
					className="vertical-ellipsis"
					height="16px"
					width="3.6px"
					alt=""
				/>
			</div>
			<p className="task-info-description">{task.description}</p>
			<h3 className="task-info-label">
				{!task.subtasks.length
					? "No subtasks"
					: `Subtask${
							task.subtasks.length > 1 ? "s" : ""
					  } (${completedSubtasks} 
				of ${subtasks})`}
			</h3>
			<div className="task-info-subtasks">
				{task.subtasks.map((subtask: any, index: number) => (
					<Subtask
						key={index.toString()}
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
