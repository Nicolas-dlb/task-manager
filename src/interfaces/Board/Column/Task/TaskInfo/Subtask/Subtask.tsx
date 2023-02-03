import { useState, useEffect } from "react";
import useTasks from "../../../../../../utils/hooks/useTasks";
import { subtasksT } from "../../../../../../utils/types/types";
import "./Subtask.scss";

function Subtask({
	subtask,
	currentTask,
	setCurrentTask,
}: {
	subtask: any;
	currentTask: any;
	setCurrentTask: any;
}) {
	const [checked, setChecked] = useState(false);
	const { editTask } = useTasks();

	useEffect(() => {
		subtask.isCompleted && setChecked(subtask.isCompleted);
	}, [subtask.isCompleted]);

	const toggleCompleted = () => {
		const newTask = {
			...currentTask,
			subtasks: currentTask?.subtasks.map((sub: subtasksT) => {
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
			<input
				type="checkbox"
				onChange={toggleCompleted}
				checked={checked}
			></input>
			<h4>{subtask.title}</h4>
		</div>
	);
}

export default Subtask;
