import React, { memo, useCallback, useState } from "react";
import { ReactComponent as VerticalEllipsis } from "../../assets/icon-vertical-ellipsis.svg";
import { Board, Task } from "../../utils/types/types";
import SettingsPanel from "./SettingsPanel/SettingsPanel";
import "./Settings.scss";

interface SettingsProps {
	item: Board | Task;
}

function Settings({ item }: SettingsProps) {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	const isTaskItem = item?.hasOwnProperty("subtasks");

	const toggleSettings = useCallback(() => {
		setIsSettingsOpen((prev) => !prev);
	}, []);

	return (
		<div className={`settings ${isTaskItem && "task-settings"}`}>
			<button
				disabled={!item}
				aria-label={`toggle ${isTaskItem ? "task" : "board"} settings`}
				className="btn-toggle"
				onClick={toggleSettings}
			>
				<VerticalEllipsis className="btn-toggle__icon" />
			</button>

			{isSettingsOpen && (
				<SettingsPanel item={item} setIsOpen={setIsSettingsOpen} />
			)}
		</div>
	);
}

export default memo(Settings);
