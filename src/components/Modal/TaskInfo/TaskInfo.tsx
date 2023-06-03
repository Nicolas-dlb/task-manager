import React, { useState, useEffect } from "react";
import Subtask from "./Subtask/Subtask";
import SelectStatus from "../../SelectStatus/SelectStatus";
import useTasks from "../../../utils/hooks/useTasks";
import { Task } from "../../../utils/types/types";
import Settings from "../../Settings/Settings";
import "./TaskInfo.scss";

interface TaskInfoProps {
	task: Task;
}

function TaskInfo({ task }: TaskInfoProps) {
	const [status, setStatus] = useState(task?.status);
	const [currentTask, setCurrentTask] = useState<Task>(task);
	const { editTask } = useTasks();

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
	}, [status]);

	const displayCompletedSubtasksNumber = !task.subtasks.length
		? "No subtasks"
		: `Subtask${subtasksLength > 1 ? "s" : ""} (${completedSubtasksLength} 
				of ${subtasksLength})`;

	return (
		<div className="task-info">
			<div className="task-info__header">
				<h3 className="task-info__title">{currentTask?.title}</h3>
				<div className="task-info__edit">
					<Settings item={currentTask} />
				</div>
			</div>
			<p className="task-info__description">{task.description}</p>
			<label className="task-info__label">
				{displayCompletedSubtasksNumber}
			</label>
			<div className="task-info__subtasks">
				{task.subtasks.map((subtask, index) => (
					<Subtask
						key={index}
						subtask={subtask}
						currentTask={currentTask}
						setCurrentTask={setCurrentTask}
					/>
				))}
			</div>
			<label htmlFor="status" className="task-info__label">
				Current Status
			</label>
			<SelectStatus status={status} setStatus={setStatus} />
		</div>
	);
}

export default TaskInfo;
