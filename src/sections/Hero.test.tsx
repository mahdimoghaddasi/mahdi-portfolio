import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { expect, test } from "vitest";
import { Hero } from "./Hero";
import { profile } from "../content/profile";

test("kinetic headline preserves its accessible name and ambient motion can be paused", async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("heading", { level: 1, name: profile.headline }),
  ).toBeInTheDocument();
  await user.click(
    screen.getByRole("button", { name: "Pause ambient motion" }),
  );
  expect(
    screen.getByRole("button", { name: "Resume ambient motion" }),
  ).toHaveAttribute("aria-pressed", "true");
  await user.click(
    screen.getByRole("button", { name: "Resume ambient motion" }),
  );
  expect(
    screen.getByRole("button", { name: "Pause ambient motion" }),
  ).toHaveAttribute("aria-pressed", "false");
});
