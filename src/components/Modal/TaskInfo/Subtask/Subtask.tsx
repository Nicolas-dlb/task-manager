import {
	useState,
	SetStateAction,
	Dispatch,
	useCallback,
	useEffect,
} from "react";
import useTasks from "../../../../utils/hooks/useTasks";
import { Subtask as ISubtask, Task } from "../../../../utils/types/types";
import Checkbox from "./Checkbox/Checkbox";
import "./Subtask.scss";

interface SubtaskProps {
	subtask: ISubtask;
	currentTask: Task;
	setCurrentTask: Dispatch<SetStateAction<Task>>;
}

function Subtask({ subtask, currentTask, setCurrentTask }: SubtaskProps) {
	const [checked, setChecked] = useState(subtask.isCompleted);
	const { editTask } = useTasks();

	const toggleCompleted = useCallback(() => {
		const newTask = {
			...currentTask,
			subtasks: currentTask?.subtasks.map((sub: ISubtask) => {
				if (sub.id === subtask.id) {
					return { ...sub, isCompleted: !sub.isCompleted };
				}
				return sub;
			}),
		};

		editTask(currentTask, newTask);
		setChecked(!checked);
		setCurrentTask(newTask);
	}, [checked, currentTask, editTask, setCurrentTask, subtask.id]);

	return (
		<button
			aria-label="check subtask"
			onClick={toggleCompleted}
			tabIndex={-1}
			className={`btn-subtask ${checked && "checked"}`}
		>
			<Checkbox checked={checked} onChange={toggleCompleted} />
			<h4 className="subtask-title">{subtask.title}</h4>
		</button>
	);
}

export default Subtask;
