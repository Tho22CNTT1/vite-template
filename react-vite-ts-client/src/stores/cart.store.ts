// src/stores/cart.store.ts
import { create } from "zustand";
import type { Product } from "@/services/productService";

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    cartItems: [],

    // thêm sản phẩm vào giỏ
    addToCart: (product, quantity = 1) => {
        const { cartItems } = get();
        const existing = cartItems.find((item) => item._id === product._id);

        let newItems: CartItem[];
        if (existing) {
            newItems = cartItems.map((item) =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            newItems = [...cartItems, { ...product, quantity }];
        }

        set({ cartItems: newItems });
    },

    // xoá 1 sản phẩm
    removeFromCart: (productId) => {
        set((state) => ({
            cartItems: state.cartItems.filter((item) => item._id !== productId),
        }));
    },

    // xoá tất cả
    clearCart: () => set({ cartItems: [] }),

    // tổng số lượng
    totalItems: () =>
        get().cartItems.reduce((sum, item) => sum + item.quantity, 0),

    // tổng giá
    totalPrice: () =>
        get().cartItems.reduce(
            (sum, item) => sum + (item.price ?? 0) * item.quantity,
            0
        ),
}));
