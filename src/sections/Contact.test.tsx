import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { expect, test, vi } from "vitest";
import { Contact } from "./Contact";

vi.mock("../content/profile", async (importOriginal) => {
  const original = await importOriginal<typeof import("../content/profile")>();
  return {
    ...original,
    profile: { ...original.profile, email: "fixture@example.test" },
  };
});

test("configured contact exposes a mail link and accessible clipboard feedback", async () => {
  const user = userEvent.setup();
  const write = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>,
  );
  expect(
    screen.getByRole("link", { name: "fixture@example.test" }),
  ).toHaveAttribute("href", "mailto:fixture@example.test");
  await user.click(screen.getByRole("button", { name: "Copy email" }));
  expect(write).toHaveBeenCalledWith("fixture@example.test");
  expect(screen.getByRole("status")).toHaveTextContent(
    "Email copied to clipboard.",
  );
  write.mockRestore();
});

test("clipboard failure offers a usable address instead of reporting success", async () => {
  const user = userEvent.setup();
  const write = vi
    .spyOn(navigator.clipboard, "writeText")
    .mockRejectedValue(new Error("Permission denied"));
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>,
  );
  await user.click(screen.getByRole("button", { name: "Copy email" }));
  expect(screen.getByRole("status")).toHaveTextContent(
    "Copy unavailable. You can select this address: fixture@example.test",
  );
  write.mockRestore();
});
