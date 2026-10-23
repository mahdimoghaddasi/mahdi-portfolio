import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router";
import { expect, test, vi } from "vitest";
import { ThemeProvider } from "../features/theme/ThemeProvider";
import { AppRoutes } from "./router";

vi.mock("../content/projects", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../content/projects")>()),
  projects: (await import("../test/fixtures")).projectFixtures,
}));

function LocationProbe() {
  const location = useLocation();
  return (
    <div data-testid="location">
      {location.pathname}
      {location.search}
    </div>
  );
}
function openRoute(path: string) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
        <LocationProbe />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

test("direct links to the lazy lab focus the section after it loads", async () => {
  openRoute("/#lab");
  await waitFor(() =>
    expect(
      screen.getByRole("region", { name: "Interactive UI Motion Lab" }),
    ).toHaveFocus(),
  );
  expect(
    screen.getByRole("switch", { name: "Focus mode" }),
  ).toBeInTheDocument();
});

test("search and category filters combine, update the URL, and preserve scroll", async () => {
  const user = userEvent.setup();
  openRoute("/projects");
  expect(screen.getByRole("status")).toHaveTextContent("2 case studies");
  expect(screen.queryByText("Private fixture draft")).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Private" }),
  ).not.toBeInTheDocument();
  vi.mocked(window.scrollTo).mockClear();
  await user.type(screen.getByRole("searchbox"), "  typescript");
  expect(screen.getByRole("status")).toHaveTextContent("1 case study");
  expect(
    screen.queryByRole("heading", { name: "Fixture Beta" }),
  ).not.toBeInTheDocument();
  expect(screen.getByTestId("location")).toHaveTextContent("q=++typescript");
  expect(window.scrollTo).not.toHaveBeenCalled();
  await user.click(screen.getByRole("button", { name: "Tool" }));
  expect(
    screen.getByRole("heading", { name: "No matching projects." }),
  ).toBeInTheDocument();
  expect(screen.getByTestId("location")).toHaveTextContent("category=Tool");
  await user.click(screen.getByRole("button", { name: "Clear filters" }));
  expect(screen.getByRole("status")).toHaveTextContent("2 case studies");
  expect(screen.getByTestId("location")).toHaveTextContent(/^\/projects$/);
  await user.click(screen.getByRole("button", { name: "Tool" }));
  expect(
    screen.getByRole("heading", { name: "Fixture Beta" }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Fixture Alpha" }),
  ).not.toBeInTheDocument();
});

test("a direct query URL restores its search and category state", () => {
  openRoute("/projects?q=react&category=Interface");
  expect(screen.getByRole("searchbox")).toHaveValue("react");
  expect(screen.getByRole("button", { name: "Interface" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(screen.getByRole("status")).toHaveTextContent("1 case study");
});

test("published detail routes show supplied sections and next/previous navigation", async () => {
  const user = userEvent.setup();
  openRoute("/projects/fixture-alpha");
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Fixture Alpha",
  );
  expect(screen.getByText("A fixture constraint.")).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Visit live project" }),
  ).toHaveAttribute("href", "https://example.test/demo");
  expect(
    screen.queryByRole("link", { name: "View source" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Challenges & solutions" }),
  ).not.toBeInTheDocument();
  await user.click(
    screen.getByRole("link", { name: /NEXT PROJECT\s*Fixture Beta/ }),
  );
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Fixture Beta",
  );
  expect(screen.getByRole("main")).toHaveFocus();
  await user.click(
    screen.getByRole("link", { name: /PREVIOUS PROJECT\s*Fixture Alpha/ }),
  );
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Fixture Alpha",
  );
});

test.each(["/projects/private-fixture", "/projects/unknown", "/unknown-page"])(
  "%s renders the branded not-found page",
  (path) => {
    openRoute(path);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "This page is off the grid.",
    );
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      screen.queryByText("Private fixture content."),
    ).not.toBeInTheDocument();
  },
);

test("mobile disclosure closes with Escape and restores its trigger focus", async () => {
  const user = userEvent.setup();
  openRoute("/projects");
  const trigger = screen.getByRole("button", { name: "Open navigation" });
  await user.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  const nav = screen.getByRole("navigation", { name: "Mobile navigation" });
  within(nav).getByRole("link", { name: "About" }).focus();
  await user.keyboard("{Escape}");
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(trigger).toHaveFocus();
  expect(
    screen.queryByRole("navigation", { name: "Mobile navigation" }),
  ).not.toBeInTheDocument();
});

test("a project-to-home anchor moves focus to the target section", async () => {
  const user = userEvent.setup();
  openRoute("/projects");
  await user.click(screen.getByRole("link", { name: "About" }));
  await waitFor(() =>
    expect(screen.getByRole("region", { name: "About Mahdi" })).toHaveFocus(),
  );
});

test("selecting the current page from the mobile menu restores visible focus", async () => {
  const user = userEvent.setup();
  openRoute("/projects");
  const trigger = screen.getByRole("button", { name: "Open navigation" });
  await user.click(trigger);
  const nav = screen.getByRole("navigation", { name: "Mobile navigation" });
  within(nav).getByRole("link", { name: "Work" }).focus();
  await user.keyboard("{Enter}");
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(trigger).toHaveFocus();
});

test("case-study actions identify their project to assistive technology", () => {
  openRoute("/projects");
  expect(
    screen.getByRole("heading", { level: 2, name: "Project results" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "View case study: Fixture Alpha" }),
  ).toHaveAttribute("href", "/projects/fixture-alpha");
  expect(
    screen.getByRole("link", { name: "View case study: Fixture Beta" }),
  ).toHaveAttribute("href", "/projects/fixture-beta");
});
