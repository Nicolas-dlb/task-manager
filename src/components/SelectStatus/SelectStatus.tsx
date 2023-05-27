import React, { Dispatch, SetStateAction, useMemo } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { useBoard } from "../../utils/hooks/useBoard";

interface SelectStatusProps {
	status: string;
	setStatus: Dispatch<SetStateAction<string>>;
}

function SelectStatus({ status, setStatus }: SelectStatusProps) {
	const { board } = useBoard();
	const options = useMemo<string[]>(
		() => board!.columns.map((column) => column.name),
		[board?.columns]
	);

	return (
		<Dropdown selected={status} setSelected={setStatus} options={options} />
	);
}

export default SelectStatus;
