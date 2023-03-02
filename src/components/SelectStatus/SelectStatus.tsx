import React, { useContext, Dispatch, SetStateAction, useMemo } from "react";
import { BoardsContext } from "../../utils/providers/BoardsProvider";
import Dropdown from "../Dropdown/Dropdown";
interface SelectStatusProps {
	status: string;
	setStatus: Dispatch<SetStateAction<string>>;
}

function SelectStatus({ status, setStatus }: SelectStatusProps) {
	const { selectedBoard } = useContext(BoardsContext);
	const options = useMemo<string[]>(
		() => selectedBoard?.columns?.map((column) => column.name),
		[selectedBoard?.columns]
	);

	return (
		<Dropdown selected={status} setSelected={setStatus} options={options} />
	);
}

export default SelectStatus;
