import {
	createContext,
	ReactNode,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

interface SidebarContextI {
	isSidebarOpen: boolean;
	setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextI>({
	isSidebarOpen: false,
	setIsSidebarOpen: (isOpen: boolean | ((prevState: boolean) => boolean)) => {},
});

function SidebarProvider({ children }: { children: ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
			{children}
		</SidebarContext.Provider>
	);
}

export default SidebarProvider;
