"use client";

import { useTheme } from "@/utils/theme-context";
import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10"></div>; // Placeholder
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border-3 border-border-color bg-theme-card shadow-brutal hover:shadow-brutal-sm active:translate-y-1 active:translate-x-1 transition-all rounded-sm flex items-center justify-center text-foreground"
      aria-label="Toggle Dark Mode"
    >
      {theme === "light" ? (
        <FiMoon size={20} className="stroke-[3]" />
      ) : (
        <FiSun size={20} className="stroke-[3]" />
      )}
    </button>
  );
};
