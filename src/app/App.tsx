import { BrowserRouter } from "react-router";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "../features/theme/ThemeProvider";
import { AppRoutes } from "./router";

export function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MotionConfig>
    </ThemeProvider>
  );
}
