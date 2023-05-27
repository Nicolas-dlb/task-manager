import { Column as IColumn } from "../../../../../utils/types/types";
import Tasks from "./Tasks/Tasks";
import { memo, useRef } from "react";
import "./Column.scss";

interface ColumnProps {
	column: IColumn;
	index: number;
}

function Column({ column, index }: ColumnProps) {
	const colorNumber = index % 3;
	const columnRef = useRef<HTMLDivElement>(null);

	return (
		<div ref={columnRef} tabIndex={-1} className="column">
			<div className="column__title__wrapper">
				<span className={`column__title__color color-${colorNumber}`}></span>
				<h3 className="column__title">
					{column.name} ({column.tasks.length})
				</h3>
			</div>
			<Tasks column={column} />
		</div>
	);
}

export default memo(Column);
