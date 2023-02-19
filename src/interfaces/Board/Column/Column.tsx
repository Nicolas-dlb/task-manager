import { useContext } from "react";
import { BoardsContext } from "../../../utils/providers/BoardsProvider";
import { ColumnT } from "../../../utils/types/types";
import "./Column.scss";
import Task from "./Task/Task";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface ColumnProps {
	column: ColumnT;
}

function Column({ column }: ColumnProps) {
	const { selectedBoard } = useContext(BoardsContext);

	const colorNumber =
		selectedBoard!.columns.findIndex((col) => col.name === column.name) % 3;

	return (
		<div className="column">
			<div className="column-title-wrapper">
				<span className={`column-title-color color-${colorNumber}`}></span>
				<h3 className="column-title">
					{column.name} ({column.tasks.length})
				</h3>
			</div>
			<Droppable droppableId={column.id}>
				{(provided) => (
					<div
						style={{
							height: "100vh",

							display: "flex",
							alignItems: "flex-start",
							flexDirection: "column",
						}}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{column.tasks.map((task, index) => (
							<Draggable draggableId={task.id} index={index} key={task.id}>
								{(provided) => (
									<div
										style={{ width: "100%" }}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										ref={provided.innerRef}
									>
										<Task key={task.id} task={task} />
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
}

export default Column;
