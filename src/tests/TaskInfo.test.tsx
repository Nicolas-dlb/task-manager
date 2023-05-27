import { fireEvent, screen, waitFor } from "@testing-library/react";
import TaskInfo from "../components/Modal/TaskInfo/TaskInfo";
import renderWithStore from "./utils/renderWithStore";
import { createStore } from "../redux/store";
import { setBoards } from "../redux/reducers/boardsSlice";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebaseConfig";

describe("TaskInfo", async () => {
	await signInAnonymously(auth);

	const store = createStore();

	const task = {
		id: "task-1",
		title: "Test task",
		description: "This is a test task",
		subtasks: [
			{ id: "1", title: "Subtask 1", isCompleted: true },
			{ id: "2", title: "Subtask 2", isCompleted: false },
			{ id: "3", title: "Subtask 3", isCompleted: true },
		],
		status: "column-1",
	};

	store.dispatch(
		setBoards([
			{
				name: "Test board",
				id: "board-1",
				columns: [
					{ id: "column-1", name: "column-1", tasks: [task] },
					{ id: "column-2", name: "column-2", tasks: [] },
				],
			},
		])
	);
	it("renders without crashing", () => {
		renderWithStore(<TaskInfo task={task} />, store);
	});

	it("displays the task title", () => {
		renderWithStore(<TaskInfo task={task} />, store);
		expect(screen.getByText("Test task")).toBeInTheDocument();
	});

	it("displays the task description", () => {
		renderWithStore(<TaskInfo task={task} />, store);
		expect(screen.getByText("This is a test task")).toBeInTheDocument();
	});

	it("displays the number of completed subtasks", () => {
		renderWithStore(<TaskInfo task={task} />, store);
		expect(screen.getByText("Subtasks (2 of 3)")).toBeInTheDocument();
	});

	it("allows the user to change the task status", async () => {
		renderWithStore(<TaskInfo task={task} />, store);
		const select = screen.getByText("column-1");
		fireEvent.click(select);
		const option = screen.getByText("column-2");
		fireEvent.click(option);
		await waitFor(() => expect(select).toHaveTextContent("column-2"));
	});
});
