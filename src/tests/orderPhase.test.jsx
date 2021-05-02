import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  render(<App />);

  // add ice cream scoop and toppings
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  const hotFudgeInput = screen.getByRole("checkbox", {
    name: /hot fudge/i,
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "1");

  userEvent.click(cherriesInput);
  userEvent.click(hotFudgeInput); // now at $5 grand total

  // find and click Order button
  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  userEvent.click(orderButton);

  // check summary info is correct based on order -- AWAIT or NAAH?
  const scoopsSubtotal = await screen.findByRole("heading", {
    name: /scoops: \$/i,
  });
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const toppingsSubtotal = await screen.findByRole("heading", {
    name: /toppings: \$/i,
  });
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  const grandTotal = await screen.findByRole("heading", { name: /Total/i });
  expect(grandTotal).toHaveTextContent("5.00");

  // accept terms and conditions and click the button to order
  const termsAndConditions = await screen.findByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(termsAndConditions);

  const confirmOrderButton = await screen.findByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);

  // confirm order number on confirmation page
  const orderNumberText = await screen.findByRole("heading", {
    name: /order number/i,
  });
  expect(orderNumberText).toBeInTheDocument();

  // click "new order" button on confirmation page
  const createNewOrderButton = await screen.findByRole("button", {
    name: /create new order/i,
  });
  userEvent.click(createNewOrderButton);

  // check that scoops and toppings subtotals have been reset
  const newScoopsSubtotal = await await screen.findByText("Scoops total $", {
    exact: false,
  });
  const newToppingsSubtotal = await screen.findByText("Toppings total $", {
    exact: false,
  });
  const newGrandTotal = await screen.findByRole("heading", {
    name: /grand total: \$/i,
  });

  expect(newScoopsSubtotal).toHaveTextContent("0.00");
  expect(newToppingsSubtotal).toHaveTextContent("0.00");
  expect(newGrandTotal).toHaveTextContent("0.00");
});
