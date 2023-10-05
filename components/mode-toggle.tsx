"use client";

import { useTheme } from "next-themes";
import Moon from "./icons/moon";
import Sun from "./icons/sun";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex items-center justify-center rounded-md"
    >
      <span className="sr-only">Toggle mode</span>
      {theme !== "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
