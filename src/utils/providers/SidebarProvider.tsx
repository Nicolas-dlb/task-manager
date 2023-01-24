import { createContext, ReactNode, useState } from "react";
import { SidebarContextI } from "../types/types";

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
