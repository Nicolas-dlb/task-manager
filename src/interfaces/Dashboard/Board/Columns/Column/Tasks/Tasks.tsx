import React, { memo } from "react";
import { StrictModeDroppable } from "../../../../../../components/StrictModeDroppable/StrictModeDroppable";
import { Column } from "../../../../../../utils/types/types";
import Task from "./Task/Task";
import "./Tasks.scss";

interface TasksProps {
	column: Column;
}

function Tasks({ column }: TasksProps) {
	return (
		<StrictModeDroppable key={column.id} droppableId={column.id}>
			{(provided) => (
				<div
					className="tasks"
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					{column.tasks.map((task, index) => (
						<Task key={task.id} task={task} index={index} />
					))}
					{provided.placeholder}
				</div>
			)}
		</StrictModeDroppable>
	);
}

export default memo(Tasks);
