import { useEffect, useState } from "react";
import "./Dropdown.scss";
import { ReactComponent as ChevronDown } from "../../assets/icon-chevron-down.svg";
import useOutsideClick from "../../utils/hooks/useOutsideClick";

interface DropdownProps {
	selected: string;
	setSelected: any;
	options: any;
}

function Dropdown({ selected, setSelected, options }: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [filteredOptions, setFilteredOptions] = useState<Crypto[]>();

	const ref = useOutsideClick(() => setIsOpen(false));

	useEffect(() => {
		if (options && !selected) setSelected(options[0]);

		selected &&
			setFilteredOptions(options?.filter((option: any) => option !== selected));
	}, [options, selected]);

	return (
		<div ref={ref} className="dropdown">
			<button onClick={() => setIsOpen(!isOpen)} className="btn-dropdown">
				{selected}
				<ChevronDown />
			</button>
			<div className={`dropdown-options ${isOpen && "open"}`}>
				{filteredOptions?.map((option: any) => (
					<button
						key={option}
						className="dropdown-option"
						onClick={() => {
							setSelected(option);
							setIsOpen(false);
						}}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
}

export default Dropdown;
