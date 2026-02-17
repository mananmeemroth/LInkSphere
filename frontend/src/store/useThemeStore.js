import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("linkSphere-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("linkSphere-theme", theme);
    set({ theme });
  },
}));