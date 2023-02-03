import React, { useState, useEffect, useContext } from "react";
import { BoardsContext } from "../../utils/providers/BoardsProvider";
import Dropdown from "../Dropdown/Dropdown";

function SelectStatus({ status, setStatus }: { status: any; setStatus: any }) {
	const { selectedBoard } = useContext(BoardsContext);
	const [options, setOptions] = useState<string[]>();

	useEffect(() => {
		setOptions(selectedBoard?.columns.map((column) => column.name));
	}, [selectedBoard]);

	return (
		<Dropdown selected={status} setSelected={setStatus} options={options} />
	);
}

export default SelectStatus;
