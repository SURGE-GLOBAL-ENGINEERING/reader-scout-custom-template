import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface CartItem {
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

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
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
        name: "cart-storage",
        partialize: (state) => ({
          items: state.items,
        }),
      }
    )
  )
);

export const useCart = () =>
  useCartStore((state) => ({
    items: state.items,
    addItem: state.addItem,
    removeItem: state.removeItem,
    updateQuantity: state.updateQuantity,
    clearCart: state.clearCart,
  }));
