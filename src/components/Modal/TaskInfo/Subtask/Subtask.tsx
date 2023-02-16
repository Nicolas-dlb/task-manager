import { useState, useEffect, SetStateAction, Dispatch } from "react";
import useTasks from "../../../../utils/hooks/useTasks";
import { SubtaskT, TaskT } from "../../../../utils/types/types";
import "./Subtask.scss";

interface SubtaskProps {
	subtask: SubtaskT;
	currentTask: TaskT;
	setCurrentTask: Dispatch<SetStateAction<TaskT>>;
}

function Subtask({ subtask, currentTask, setCurrentTask }: SubtaskProps) {
	const [checked, setChecked] = useState(false);
	const { editTask } = useTasks();

	useEffect(() => {
		subtask.isCompleted && setChecked(subtask.isCompleted);
	}, [subtask.isCompleted]);

	const toggleCompleted = () => {
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
	};

	return (
		<div className={`subtask ${checked && "checked"}`}>
			<input type="checkbox" onChange={toggleCompleted} checked={checked} />
			<h4>{subtask.title}</h4>
		</div>
	);
}

export default Subtask;
