import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("it displays image for each scoop from the server", async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((img) => img.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("it displays image for each topping from the server", async () => {
  render(<Options optionType="toppings" />);

  const toppingsImages = await screen.findAllByRole("img", {
    name: /topping/i,
  });
  expect(toppingsImages).toHaveLength(3);

  const altText = toppingsImages.map((toppings) => toppings.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot Fudge topping",
  ]);
});
