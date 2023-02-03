import crossIcon from "../../../../../../../assets/icon-cross.svg";
import "./RemovableInput.scss";

function RemovableInput({ state, setStates }: any) {
	return (
		<div className="create-task-subtask">
			<input
				type="text"
				placeholder="e.g. Take coffee break"
				className="create-subtask-input"
				value={state.title || state.name}
				onChange={(e) =>
					setStates((prev: any) =>
						prev.map((item: any) => {
							if (item.id === state.id) {
								typeof item.title === "string"
									? (item.title = e.target.value)
									: (item.name = e.target.value);
							}
							return item;
						})
					)
				}
			/>
			<img
				onClick={() =>
					setStates((prev: any) =>
						prev.filter((subtask: any) => subtask.id !== state.id)
					)
				}
				src={crossIcon}
				className="create-task-delete-subtask"
				width="13px"
				height="13px"
				alt=""
			/>
		</div>
	);
}

export default RemovableInput;
