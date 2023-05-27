import { describe, it } from "vitest";
import App from "../App";
import renderWithStore from "./utils/renderWithStore";
import { BrowserRouter } from "react-router-dom";

describe("App", () => {
	it("Renders app properly", () => {
		const view = renderWithStore(
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);

		expect(view).toMatchSnapshot();
	});
});
