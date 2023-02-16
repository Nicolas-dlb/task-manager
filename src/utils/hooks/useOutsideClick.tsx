import { RefObject, useEffect, useRef } from "react";

const useOutsideClick = (
	callback: () => void,
	targetToAvoid?: RefObject<HTMLElement>
) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				ref.current &&
				!ref.current.contains(event.target as Node) &&
				event.target !== targetToAvoid?.current
			) {
				callback();
			}
		};

		document.addEventListener("click", handleClick, true);

		return () => {
			document.removeEventListener("click", handleClick, true);
		};
	}, [ref, callback, targetToAvoid]);

	return ref;
};
export default useOutsideClick;
