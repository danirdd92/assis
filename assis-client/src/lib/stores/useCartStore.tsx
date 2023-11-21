import { CartItem } from "@lib/types";
import { create } from "zustand";

type CartState = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
};

export const useCartStore = create<CartState>()((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingCartItemIndex = state.cart.findIndex(
        (i) => item.product.id === i.product.id
      );

      if (existingCartItemIndex !== -1) {
        const newCart = state.cart.map((i, index) =>
          index === existingCartItemIndex ? { ...i, quantity: i.quantity + 1 } : i
        );
        return { cart: newCart };
      }

      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (item) =>
    set((state) => {
      const existingCartItemIndex = state.cart.findIndex(
        (i) => item.product.id === i.product.id
      );

      if (existingCartItemIndex !== -1) {
        const newCart = state.cart
          .map((i, index) =>
            index === existingCartItemIndex ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0);
        return { cart: newCart };
      }

      return { cart: state.cart };
    }),
}));
