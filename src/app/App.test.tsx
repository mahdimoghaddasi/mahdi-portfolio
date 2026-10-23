import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { App } from "./App";

test("renders the portfolio and honest content fallbacks", async () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "I engineer interfaces",
  );
  expect(screen.getAllByText("Case study coming soon")).toHaveLength(2);
  expect(screen.getByText("CONTACT DETAILS COMING SOON")).toBeInTheDocument();
  expect(
    await screen.findByRole("switch", { name: "Focus mode" }),
  ).toBeInTheDocument();
});
