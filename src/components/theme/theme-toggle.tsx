"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
    >
      {mounted
        ? `Switch to ${theme === "light" ? "Dark" : "Light"}`
        : "Loading..."}
    </button>
  );
}
