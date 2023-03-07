import { create } from "zustand";
// getTheme is for set theme day or night

export const useThemeStore = create((set) => ({
  themeMode: "day",
  setTheme: (state) => set({ themeMode: state.themeMode }),
}));
