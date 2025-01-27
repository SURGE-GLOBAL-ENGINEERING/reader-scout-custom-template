"use client";

import { useCart } from "@/store/cart-store";

// Example: Using Cart Store with Persistence
export function CartStoreExample() {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCart();

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Example product to add
  const sampleBook = {
    id: "book-1",
    name: "The Great Novel",
    price: 29.99,
  };

  // Handle quantity changes with validation
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    } else {
      // Reset to 1 if invalid quantity
      updateQuantity(itemId, 1);
    }
  };

  // Handle quantity decrease
  const decreaseQuantity = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    } else {
      removeItem(itemId);
    }
  };

  // Handle quantity increase with a reasonable limit
  const increaseQuantity = (itemId: string, currentQuantity: number) => {
    const MAX_QUANTITY = 99;
    if (currentQuantity < MAX_QUANTITY) {
      updateQuantity(itemId, currentQuantity + 1);
    } else {
      alert(`Maximum quantity limit is ${MAX_QUANTITY}`);
    }
  };

  // Handle direct item removal with confirmation
  const handleRemoveItem = (itemId: string) => {
    if (window.confirm("Remove this item from cart?")) {
      removeItem(itemId);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Cart Store Example</h2>

      <div className="space-y-2">
        <div>
          <p>Total Items: {totalItems}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>

        <div className="space-x-2">
          <button
            onClick={() => addItem(sampleBook)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Sample Book
          </button>
          <button
            onClick={() => clearCart()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Cart Items:</h3>
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <span className="min-w-[150px] font-medium">{item.name}</span>
                <span className="min-w-[80px] text-gray-600 dark:text-gray-300">
                  ${item.price}
                </span>

                {/* Quantity controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id, item.quantity)}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                    title="Decrease quantity"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={item.quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      handleQuantityChange(item.id, value);
                    }}
                    className="w-16 px-2 py-1 border rounded text-foreground bg-background text-center"
                    title="Enter quantity"
                  />

                  <button
                    onClick={() => increaseQuantity(item.id, item.quantity)}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                    title="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <span className="min-w-[100px] text-right font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  title="Remove item"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * Usage Examples:
 *
 * 1. Using Cart Store:
 * ```typescript
 * import { useCart } from "@/store/cart-store";
 *
 * function CartComponent() {
 *   const { items, addItem, removeItem, updateQuantity, clearCart } = useCart();
 *
 *   // Add item
 *   addItem({ id: "book-1", name: "Book Title", price: 29.99 });
 *
 *   // Update quantity
 *   updateQuantity("book-1", 2);
 *
 *   // Remove item
 *   removeItem("book-1");
 *
 *   // Clear cart
 *   clearCart();
 * }
 * ```
 *
 * 2. Direct Storage Access:
 * ```typescript
 * import { storage } from "@/lib/storage/storage";
 *
 * // Load cart
 * const cart = storage.get("cart-storage", { items: [] });
 *
 * // Save cart
 * storage.set("cart-storage", {
 *   items: [{ id: "book-1", name: "Book", price: 29.99, quantity: 1 }]
 * });
 * ```
 *
 * Key Features:
 * - Persistent cart state with Zustand
 * - Type-safe operations
 * - Automatic storage synchronization
 * - Direct storage access when needed
 * - Cart total calculations
 * - Quantity management
 */
