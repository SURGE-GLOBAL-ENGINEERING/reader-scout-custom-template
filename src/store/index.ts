import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Define store slices
interface UIState {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

// Sample cart state implementation
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

// Create store
export const useStore = create<UIState & CartState>()(
  devtools(
    persist(
      (set) => ({
        // UI slice
        theme: "light",
        setTheme: (theme) => set({ theme }),

        // Cart slice - Sample implementation
        items: [],
        addItem: (item) =>
          set((state) => {
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
              return {
                items: state.items.map((i) =>
                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
              };
            }
            return { items: [...state.items, { ...item, quantity: 1 }] };
          }),
        removeItem: (itemId) =>
          set((state) => ({
            items: state.items.filter((i) => i.id !== itemId),
          })),
        updateQuantity: (itemId, quantity) =>
          set((state) => ({
            items: state.items.map((i) =>
              i.id === itemId ? { ...i, quantity } : i
            ),
          })),
        clearCart: () => set({ items: [] }),
      }),
      {
        name: "app-storage",
        partialize: (state) => ({
          theme: state.theme,
          items: state.items,
        }),
      }
    )
  )
);

// Create hooks for accessing specific slices
export const useTheme = () => useStore((state) => state.theme);
export const useCart = () =>
  useStore((state) => ({
    items: state.items,
    addItem: state.addItem,
    removeItem: state.removeItem,
    updateQuantity: state.updateQuantity,
    clearCart: state.clearCart,
  }));

export * from "./ui-store";
export * from "./cart-store";
