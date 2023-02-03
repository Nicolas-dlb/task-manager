import React, { useContext, useEffect } from "react";
import { BoardsContext } from "../../../utils/providers/BoardsProvider";
import { ColumnT } from "../../../utils/types/types";
import "./Column.scss";
import Task from "./Task/Task";

function Column({ column }: { column: ColumnT }) {
	const { selectedBoard } = useContext(BoardsContext);
	const colorNumber =
		selectedBoard!.columns.findIndex((col) => col.name === column.name) % 3;

	useEffect(() => {
		console.log(column);
	}, [column]);

	return (
		<div className="column">
			<div className="column-title-wrapper">
				<div className={`column-title-color color-${colorNumber}`}></div>
				<h3 className="column-title">
					{column.name} ({column.tasks.length})
				</h3>
			</div>
			{column.tasks.map((task, index) => (
				<Task key={index.toString()} task={task} />
			))}
		</div>
	);
}

export default Column;
