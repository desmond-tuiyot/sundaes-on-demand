import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handles errors for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (res, req, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (res, req, ctx) =>
      res(ctx.status(500))
    )
  );
  render(<OrderEntry />);

  await waitFor(async () => {
    const alertBanners = await screen.findAllByRole("alert");
    expect(alertBanners).toHaveLength(2);
  });
});
