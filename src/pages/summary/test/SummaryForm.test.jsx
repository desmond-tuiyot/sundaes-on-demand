import SummaryForm from "../SummaryForm";
import { render, screen, fireEvent } from "@testing-library/react";

// TODO: test to check that checkbox is initially unchecked
// TODO: test to check that button is initially disabled
// TODO: test to ensure that checking checkbox enables button
// TODO: test to ensure that unchecking checkbox disables button

test("checking checkbox enables button and unchecking it disables button", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm Order" });

  // initial conditions of checkbox and button
  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();

  // clicking checkbox enables button
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(confirmButton).toBeEnabled();

  // clicking checkbox again disables button
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});
