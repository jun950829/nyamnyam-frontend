'use client';

import { useThemeStore } from "@/stores/useThemeStore";

const ThemeToggleBtn = () => {
  const theme  = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white border border-gray-500"
      onClick={() => toggleTheme()}
    >
      {theme === 'light' ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}

export default ThemeToggleBtn;