import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("scoop subtotal updates when adding scoops", async () => {
  render(<Options optionType="scoops" />);

  const scoopSubtotal = screen.getByText("Scoops total $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("toppings subtotal updates when adding toppings", async () => {
  render(<Options optionType="toppings" />);
  const toppingsSubtotal = screen.getByText("Toppings total $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: /hot fudge/i,
  });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    // check that it starts out at 0
    expect(grandTotal).toHaveTextContent("0.00");

    // get chocolate scoop input and input 2, assert
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: /chocolate/i,
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    // get cherries toppings checkbox and click, assert
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const hotFudgeCheckbox = await screen.findByRole("checkbox", {
      name: /hot fudge/i,
    });
    userEvent.click(hotFudgeCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("grand total updates properly if an item is removed", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });
    const mNmCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });

    // add 2 scoops + 1 topping and check grand total is correct
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    userEvent.click(mNmCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");

    // remove one topping and check that grand total is correct
    userEvent.click(mNmCheckbox);
    expect(grandTotal).toHaveTextContent("4.00");

    // remove one scoop and check that grand total is correct
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
