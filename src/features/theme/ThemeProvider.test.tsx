import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { beforeEach, expect, test, vi } from "vitest";
import { ThemeProvider } from "./ThemeProvider";
import { ThemeControl } from "./ThemeControl";

beforeEach(() => {
  localStorage.clear();
});

test("theme choice persists across remounts and is applied to the document", async () => {
  const user = userEvent.setup();
  const first = render(
    <ThemeProvider>
      <ThemeControl />
    </ThemeProvider>,
  );
  await user.selectOptions(
    screen.getByRole("combobox", { name: "Color theme" }),
    "light",
  );
  expect(document.documentElement).toHaveAttribute("data-theme", "light");
  expect(localStorage.getItem("mahdi-theme")).toBe("light");
  first.unmount();
  render(
    <ThemeProvider>
      <ThemeControl />
    </ThemeProvider>,
  );
  expect(screen.getByRole("combobox")).toHaveValue("light");
  await user.selectOptions(screen.getByRole("combobox"), "dark");
  expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  expect(localStorage.getItem("mahdi-theme")).toBe("dark");
});

test("system mode follows live OS changes and removes the listener on unmount", async () => {
  let listener: (() => void) | undefined;
  const removeEventListener = vi.fn();
  const media = {
    matches: true,
    addEventListener: vi.fn((_event, callback: () => void) => {
      listener = callback;
    }),
    removeEventListener,
  };
  const spy = vi
    .spyOn(window, "matchMedia")
    .mockReturnValue(media as unknown as MediaQueryList);
  const view = render(
    <ThemeProvider>
      <ThemeControl />
    </ThemeProvider>,
  );
  expect(screen.getByRole("combobox")).toHaveValue("system");
  expect(document.documentElement).toHaveAttribute("data-theme", "light");
  act(() => {
    media.matches = false;
    listener?.();
  });
  await waitFor(() =>
    expect(document.documentElement).toHaveAttribute("data-theme", "dark"),
  );
  view.unmount();
  expect(removeEventListener).toHaveBeenCalledWith("change", listener);
  spy.mockRestore();
});

test("blocked storage does not prevent using the theme control", async () => {
  const read = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new Error("Blocked");
  });
  const write = vi
    .spyOn(Storage.prototype, "setItem")
    .mockImplementation(() => {
      throw new Error("Blocked");
    });
  const user = userEvent.setup();
  render(
    <ThemeProvider>
      <ThemeControl />
    </ThemeProvider>,
  );
  await user.selectOptions(screen.getByRole("combobox"), "light");
  expect(document.documentElement).toHaveAttribute("data-theme", "light");
  read.mockRestore();
  write.mockRestore();
});
