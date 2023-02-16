import { useContext } from "react";
import { BoardsContext } from "../../../utils/providers/BoardsProvider";
import { ColumnT } from "../../../utils/types/types";
import "./Column.scss";
import Task from "./Task/Task";

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
			{column.tasks.map((task) => (
				<Task key={task.id} task={task} />
			))}
		</div>
	);
}

export default Column;
