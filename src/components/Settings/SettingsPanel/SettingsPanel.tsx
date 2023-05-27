import React, { Dispatch, SetStateAction, useCallback, useRef } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { setModalComponent } from "../../../redux/reducers/appSlice";
import { Board, Task } from "../../../utils/types/types";
import { useOnClickOutside } from "usehooks-ts";
import "./SettingsPanel.scss";

interface SettingsPanelProps {
	item: Task | Board;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function SettingsPanel({ item, setIsOpen }: SettingsPanelProps) {
	const dispatch = useAppDispatch();
	const settings = useRef<HTMLElement>(null);
	const isBoard = item?.hasOwnProperty("columns");
	const itemType = isBoard ? "Board" : "Task";

	useOnClickOutside(settings, (e) => {
		!(e.target as Element).classList.contains("btn-toggle") && setIsOpen(false);
	});

	const openModal = useCallback((type: "Delete" | "Edit") => {
		dispatch(
			setModalComponent({
				type: type + itemType,
				item: item,
			})
		);
		setIsOpen(false);
	}, []);

	return (
		<section ref={settings} className="settings-panel">
			<button onClick={() => openModal("Edit")} className="btn-edit">
				Edit {itemType}
			</button>
			<button onClick={() => openModal("Delete")} className="btn-delete">
				Delete {itemType}
			</button>
		</section>
	);
}

export default SettingsPanel;
