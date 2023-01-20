import { render } from "@testing-library/react";
import React from "react";
import App from "../interfaces/App/App";

describe("App", () => {
  it("Should render the app correctly", () => {
    const view = render(<App />);
    expect(view).toMatchSnapshot();
  });
});
