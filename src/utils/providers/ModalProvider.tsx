import React, { createContext, useState, ReactNode } from "react";
interface ModalContextI {
	modalComponent: JSX.Element | null;
	setModalComponent: (component: JSX.Element | null) => void;
}
export const ModalContext = createContext<ModalContextI>({
	modalComponent: null,
	setModalComponent: (component: JSX.Element | null) => {},
});

function ModalProvider({ children }: { children: ReactNode }) {
	const [modalComponent, setModalComponent] = useState<JSX.Element | null>(
		null
	);

	return (
		<ModalContext.Provider value={{ modalComponent, setModalComponent }}>
			{children}
		</ModalContext.Provider>
	);
}

export default ModalProvider;
