import {
	useState,
	useEffect,
	SetStateAction,
	Dispatch,
	useCallback,
} from "react";
import useTasks from "../../../../utils/hooks/useTasks";
import { SubtaskT, TaskT } from "../../../../utils/types/types";
import "./Subtask.scss";

interface SubtaskProps {
	subtask: SubtaskT;
	currentTask: TaskT;
	setCurrentTask: Dispatch<SetStateAction<TaskT>>;
}

function Subtask({ subtask, currentTask, setCurrentTask }: SubtaskProps) {
	const [checked, setChecked] = useState(subtask.isCompleted);
	const { editTask } = useTasks();
	console.log("subtask render");
	const toggleCompleted = useCallback(() => {
		const newTask = {
			...currentTask,
			subtasks: currentTask?.subtasks.map((sub: SubtaskT) => {
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
			className={`btn-subtask ${checked && "checked"}`}
		>
			<input type="checkbox" checked={checked} />
			<span className="checkmark"></span>

			<h4 className="subtask-title">{subtask.title}</h4>
		</button>
	);
}

export default Subtask;
