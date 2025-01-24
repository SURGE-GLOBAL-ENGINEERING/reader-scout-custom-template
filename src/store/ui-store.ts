import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UIState {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        theme: "light",
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: "ui-storage",
        partialize: (state) => ({
          theme: state.theme,
        }),
      }
    )
  )
);

export const useTheme = () => useUIStore((state) => state.theme);
