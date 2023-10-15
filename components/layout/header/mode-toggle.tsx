"use client";

import { useEffect, useState } from "react";
import { Theme } from "@/constants";
import { useTheme } from "next-themes";
import Moon from "../../icons/moon";
import Sun from "../../icons/sun";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [theme]);

  if (!isMounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === Theme.light ? Theme.dark : Theme.light)}
      className="flex items-center justify-center rounded-md"
    >
      <span className="sr-only">Toggle mode</span>
      {theme !== Theme.dark ? <Sun /> : <Moon />}
    </button>
  );
}
