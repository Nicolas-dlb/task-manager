import React, {
	useState,
	useEffect,
	useContext,
	Dispatch,
	SetStateAction,
} from "react";
import { BoardsContext } from "../../utils/providers/BoardsProvider";
import Dropdown from "../Dropdown/Dropdown";
interface SelectStatusProps {
	status: string;
	setStatus: Dispatch<SetStateAction<string>>;
}

function SelectStatus({ status, setStatus }: SelectStatusProps) {
	const { selectedBoard } = useContext(BoardsContext);
	const [options, setOptions] = useState<string[]>([]);

	useEffect(() => {
		const boardStatus = selectedBoard?.columns.map((column) => column.name);
		setOptions(boardStatus);
	}, [selectedBoard]);

	return (
		<Dropdown selected={status} setSelected={setStatus} options={options} />
	);
}

export default SelectStatus;
