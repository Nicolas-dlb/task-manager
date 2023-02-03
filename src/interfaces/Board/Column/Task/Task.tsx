import React, { useContext } from "react";

import { ModalContext } from "../../../../utils/providers/ModalProvider";
import { TaskT } from "../../../../utils/types/types";
import "./Task.scss";
import TaskInfo from "./TaskInfo/TaskInfo";

function Task({ task }: { task: TaskT }) {
	const { setModalComponent } = useContext(ModalContext);
	const completedSubtasks = task?.subtasks.filter(
		(subtask) => subtask.isCompleted
	).length;
	const subtasks = task?.subtasks.length;

	return (
		<div
			onClick={() => setModalComponent(<TaskInfo task={task} />)}
			className="task"
		>
			<h3 className="task-name">{task.title}</h3>
			<p className="subtasks">
				{!task.subtasks.length
					? "No subtasks"
					: `${completedSubtasks} 
				of ${subtasks} subtask${task.subtasks.length > 1 ? "s" : ""}`}
			</p>
		</div>
	);
}

export default Task;
