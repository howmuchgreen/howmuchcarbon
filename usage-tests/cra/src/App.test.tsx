import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders Paris New York City search result", () => {
  render(<App />);
  const searchBox = screen.getByTestId(/search-input/i);
  expect(searchBox).toBeInTheDocument();
  userEvent.type(searchBox, "paris new york");
  const resultElement = screen.getByTestId(/result-element/i);
  expect(resultElement.textContent).toContain("Paris");
  expect(resultElement.textContent).toContain("New York City");
});
