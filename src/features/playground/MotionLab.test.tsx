import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";
import MotionLab from "./MotionLab";

const preferences = vi.hoisted(() => ({ reduced: false }));
vi.mock("motion/react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("motion/react")>()),
  useReducedMotion: () => preferences.reduced,
}));
afterEach(() => {
  preferences.reduced = false;
});

test("focus switch works with the keyboard and reset restores its state", async () => {
  const user = userEvent.setup();
  render(<MotionLab />);
  const toggle = screen.getByRole("switch", { name: "Focus mode" });
  toggle.focus();
  await user.keyboard("[Space]");
  expect(toggle).toBeChecked();
  expect(screen.getByRole("status")).toHaveTextContent("Focus mode is on");
  await user.click(screen.getByRole("button", { name: "Reset" }));
  expect(toggle).not.toBeChecked();
});

test("save/undo and reveal are real reversible interactions", async () => {
  const user = userEvent.setup();
  render(<MotionLab />);
  await user.click(screen.getByRole("button", { name: /The save/ }));
  const save = screen.getByRole("button", { name: "Save this idea" });
  await user.click(save);
  expect(save).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("status")).toHaveTextContent("Idea saved");
  await user.click(save);
  expect(save).toHaveAttribute("aria-pressed", "false");
  await user.click(screen.getByRole("button", { name: /The reveal/ }));
  const reveal = screen.getByRole("button", { name: "A closer look" });
  expect(reveal).toHaveAttribute("aria-expanded", "false");
  expect(screen.getByText(/A clear action/)).not.toBeVisible();
  reveal.focus();
  await user.keyboard("{Enter}");
  expect(reveal).toHaveAttribute("aria-expanded", "true");
  await waitFor(() => expect(screen.getByText(/A clear action/)).toBeVisible());
  await user.click(screen.getByRole("button", { name: "Reset" }));
  expect(reveal).toHaveAttribute("aria-expanded", "false");
});

test("reduced motion disables timing without disabling interactions", async () => {
  const user = userEvent.setup();
  render(<MotionLab />);
  const timing = screen.getByRole("combobox", { name: "Timing" });
  await user.selectOptions(timing, "quick");
  expect(timing).toHaveValue("quick");
  await user.click(screen.getByRole("checkbox", { name: "Reduce motion" }));
  expect(timing).toBeDisabled();
  await user.click(screen.getByRole("switch", { name: "Focus mode" }));
  expect(screen.getByRole("switch", { name: "Focus mode" })).toBeChecked();
});

test("operating-system reduced motion cannot be overridden by the demo", () => {
  preferences.reduced = true;
  render(<MotionLab />);
  const checkbox = screen.getByRole("checkbox", { name: /Reduce motion/ });
  expect(checkbox).toBeChecked();
  expect(checkbox).toBeDisabled();
  expect(screen.getByRole("combobox", { name: "Timing" })).toBeDisabled();
});
