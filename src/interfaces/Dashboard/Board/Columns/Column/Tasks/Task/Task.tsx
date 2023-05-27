import React, { KeyboardEvent, memo } from "react";
import { Task as ITask } from "../../../../../../../utils/types/types";
import { setModalComponent } from "../../../../../../../redux/reducers/appSlice";
import { useAppDispatch } from "../../../../../../../redux/hooks";
import { Draggable } from "react-beautiful-dnd";
import "./Task.scss";

interface TaskProps {
	task: ITask;
	index: number;
}

function Task({ task, index }: TaskProps) {
	const completedSubtasks = task?.subtasks.filter(
		(subtask) => subtask.isCompleted
	).length;

	const dispatch = useAppDispatch();

	const subtasks = task?.subtasks.length;

	const displaySubtasksNumber = !task.subtasks.length
		? "No subtasks"
		: `${completedSubtasks} 
				of ${subtasks} subtask${task.subtasks.length > 1 ? "s" : ""}`;

	const handleClick = () =>
		dispatch(setModalComponent({ type: "TaskInfo", item: task }));

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) =>
		e.code === "Enter" &&
		dispatch(setModalComponent({ type: "TaskInfo", item: task }));

	return (
		<Draggable key={task.id} draggableId={task.id} index={index}>
			{(provided) => (
				<div
					onClick={handleClick}
					className="task"
					onKeyDown={handleKeyDown}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<h3 className="task__title">{task.title}</h3>
					<p>{displaySubtasksNumber}</p>
				</div>
			)}
		</Draggable>
	);
}

export default memo(Task);
