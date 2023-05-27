import React, { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
	id: string;
	children: any;
}

export default function SortableItem({ id, children }: SortableItemProps) {
	const { attributes, listeners, setNodeRef, transform, transition, active } =
		useSortable({ id: id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: active?.id === id ? 1 : 0,
	};

	return (
		<div
			className="sortable-item"
			ref={setNodeRef}
			style={style}
			{...attributes}
			tabIndex={-1}
		>
			{React.cloneElement(children, { ...listeners })}
		</div>
	);
}
