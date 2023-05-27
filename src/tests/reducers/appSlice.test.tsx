import appReducer, {
	setIsSidebarOpen,
	setModalComponent,
	selectSidebarOpen,
	selectModalComponent,
} from "../../redux/reducers/appSlice";

describe("appSlice reducer", () => {
	const initialState = {
		isSidebarOpen: false,
		modalComponent: { type: null },
	};

	it("should handle setIsSidebarOpen", () => {
		const newState = appReducer(initialState, setIsSidebarOpen(true));
		expect(newState.isSidebarOpen).toBe(true);
	});

	it("should handle setModalComponent", () => {
		const newModalComponent = {
			type: "EditBoard",
			item: { id: "123", name: "Test task", tasks: [] },
		};

		const newState = appReducer(
			initialState,
			setModalComponent(newModalComponent)
		);

		expect(newState.modalComponent).toEqual(newModalComponent);
	});

	it("should select the sidebar open state", () => {
		const state = {
			app: { isSidebarOpen: true, modalComponent: { type: "Sidebar" } },
			boards: { boards: [], selectedBoard: 0 },
		};

		const selectedState = selectSidebarOpen(state);
		expect(selectedState).toBe(true);
	});

	it("should select the modal component state", () => {
		const modalComponent = {
			type: "Sidebar",
		};
		const state = {
			app: { isSidebarOpen: false, modalComponent },
			boards: { boards: [], selectedBoard: 0 },
		};
		const selectedState = selectModalComponent(state);
		expect(selectedState).toEqual(modalComponent);
	});
});
