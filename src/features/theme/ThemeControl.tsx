import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeControl() {
  const { theme, setTheme } = useTheme();
  const Icon = theme === "system" ? Monitor : theme === "dark" ? Moon : Sun;
  return (
    <div className="theme-control">
      <Icon size={15} aria-hidden="true" />
      <label className="sr-only" htmlFor="theme-select">
        Color theme
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={(event) =>
          setTheme(event.target.value as "dark" | "light" | "system")
        }
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
}
