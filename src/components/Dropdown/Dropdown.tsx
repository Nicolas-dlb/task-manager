import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import "./Dropdown.scss";
import { ReactComponent as ChevronDown } from "../../assets/icon-chevron-down.svg";
import useOutsideClick from "../../utils/hooks/useOutsideClick";

interface DropdownProps {
	selected: string;
	setSelected: Dispatch<SetStateAction<string>>;
	options: string[];
}

function Dropdown({ selected, setSelected, options }: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useOutsideClick(() => setIsOpen(false));

	const filteredOptions = useMemo(
		() => options?.filter((option) => option !== selected),
		[options, selected]
	);

	useEffect(() => {
		if (options && !selected) setSelected(options[0]);
	}, [options, selected, setSelected]);

	const selectOption = useCallback(
		(option: string) => {
			setSelected(option);
			setIsOpen(false);
		},
		[setSelected]
	);

	const toggleMenu = useCallback(() => setIsOpen(!isOpen), [isOpen]);

	return (
		<div ref={ref} className="dropdown">
			<button
				type="button"
				onClick={toggleMenu}
				aria-label="dropdown"
				disabled={!filteredOptions.length}
				className="btn-dropdown"
			>
				{selected}
				<ChevronDown />
			</button>
			<div className={`dropdown-options ${isOpen && "open"}`}>
				{filteredOptions?.map((option) => (
					<button
						key={option}
						type="button"
						aria-label="dropdown option"
						className="dropdown-option"
						onClick={() => selectOption(option)}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
}

export default Dropdown;
