import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { ReactComponent as ChevronDown } from "../../assets/icon-chevron-down.svg";
import { useOnClickOutside } from "usehooks-ts";
import "./Dropdown.scss";

interface DropdownProps {
	selected: string;
	setSelected: Dispatch<SetStateAction<string>>;
	options: string[];
}

function Dropdown({ selected, setSelected, options }: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdown = useRef(null);

	useOnClickOutside(dropdown, () => setIsOpen(false));

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
		<div ref={dropdown} className="dropdown">
			<button
				id="status"
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
