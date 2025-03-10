import { create } from "zustand";

type Theme = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
};

export const useThemeStore = create<Theme>((set) => ({
  theme: 'light',
  toggleTheme: () => set((state: Theme) => {

    document.documentElement.classList.toggle('dark', state.theme === 'light');
    localStorage.setItem('theme', state.theme === 'light' ? 'dark' : 'light');

    return { theme: state.theme === 'light' ? 'dark' : 'light'
    };
  }),
  setTheme: (theme: 'light' | 'dark') => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    set({ theme })
  },
}));