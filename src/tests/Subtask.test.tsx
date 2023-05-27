import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import Subtask from "../components/Modal/TaskInfo/Subtask/Subtask";
import { vi } from "vitest";
import renderWithStore from "./utils/renderWithStore";

const mockEditTask = vi.fn();

vi.mock("../utils/hooks/useTasks", () => ({
	default: () => {
		return { editTask: mockEditTask };
	},
}));

describe("Subtask component", () => {
	const subtask = { id: "1", title: "Subtask 1", isCompleted: false };
	const currentTask = {
		id: "1",
		title: "Task 1",
		description: "Test description",
		status: "Todo",
		subtasks: [subtask],
	};

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should render the subtask title", () => {
		renderWithStore(
			<Subtask
				subtask={subtask}
				currentTask={currentTask}
				setCurrentTask={() => {}}
			/>
		);

		expect(screen.getByText("Subtask 1")).toBeInTheDocument();
	});

	it("should toggle the subtask completion when clicked", () => {
		renderWithStore(
			<Subtask
				subtask={subtask}
				currentTask={currentTask}
				setCurrentTask={() => {}}
			/>
		);

		const checkbox = screen.getByLabelText("check subtask");
		fireEvent.click(checkbox);

		expect(mockEditTask).toHaveBeenCalledWith(currentTask, {
			...currentTask,
			subtasks: [{ ...subtask, isCompleted: true }],
		});
	});

	it("should display a checked state if the subtask is completed", () => {
		const completedSubtask = { ...subtask, isCompleted: true };
		renderWithStore(
			<Subtask
				subtask={completedSubtask}
				currentTask={currentTask}
				setCurrentTask={() => {}}
			/>
		);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("checked");
	});
});
