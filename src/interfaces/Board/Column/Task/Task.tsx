import React, { useContext } from "react";

import { ModalContext } from "../../../../utils/providers/ModalProvider";
import { TaskT } from "../../../../utils/types/types";
import "./Task.scss";
import TaskInfo from "../../../../components/Modal/TaskInfo/TaskInfo";
import { Draggable } from "react-beautiful-dnd";

interface TaskProps {
	task: TaskT;
	index: number;
}

function Task({ task, index }: TaskProps) {
	const { setModalComponent } = useContext(ModalContext);

	const completedSubtasks = task?.subtasks.filter(
		(subtask) => subtask.isCompleted
	).length;

	const subtasks = task?.subtasks.length;

	const displaySubtasksNumber = !task.subtasks.length
		? "No subtasks"
		: `${completedSubtasks} 
				of ${subtasks} subtask${task.subtasks.length > 1 ? "s" : ""}`;

	return (
		<Draggable draggableId={task.id} index={index} key={task.id}>
			{(provided) => (
				<div
					style={{ width: "100%" }}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<div
						onClick={() => setModalComponent(<TaskInfo task={task} />)}
						className="task"
					>
						<h3 className="task-title">{task.title}</h3>
						<p className="subtasks">{displaySubtasksNumber}</p>
					</div>
				</div>
			)}
		</Draggable>
	);
}

export default Task;
