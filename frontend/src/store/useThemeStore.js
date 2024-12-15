import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
   
    document.documentElement.setAttribute('data-theme', theme);
  },
}));

document.documentElement.setAttribute('data-theme', localStorage.getItem("chat-theme") || "light");