import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/services/productService";

// ✅ Kiểu sản phẩm trong giỏ
export interface CartItem extends Product {
    _id: string;
    product_name: string;
    price: number;
    thumbnail?: string;
    quantity: number;
}

// ✅ Kiểu thông tin đơn hàng
export interface OrderInfo {
    customerName: string;
    phone: string;
    address: string;
    note?: string;
    paymentMethod: "COD" | "Banking" | "Momo";
}

interface ShoppingCartState {
    items: CartItem[];
    orderInfo: OrderInfo;

    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    increaseItemQuantity: (productId: string) => void;
    decreaseItemQuantity: (productId: string) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
    hasItem: (productId: string) => boolean;

    setOrderInfo: (info: OrderInfo) => void;
    clearOrderInfo: () => void;
}

// ✅ ép kiểu rõ ràng cho default
const orderInfoDefault: OrderInfo = {
    customerName: "",
    phone: "",
    address: "",
    note: "",
    paymentMethod: "COD",
};

export const useShoppingCartStore = create<ShoppingCartState>()(
    persist(
        (set, get) => ({
            items: [],
            orderInfo: orderInfoDefault,

            addToCart: (product, quantity = 1) =>
                set((state) => {
                    const existing = state.items.find((item) => item._id === product._id);
                    if (existing) {
                        return {
                            items: state.items.map((item) =>
                                item._id === product._id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                        };
                    }
                    return { items: [...state.items, { ...product, quantity }] };
                }),

            removeFromCart: (productId) =>
                set((state) => ({
                    items: state.items.filter((item) => item._id !== productId),
                })),

            increaseItemQuantity: (productId) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item._id === productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                })),

            decreaseItemQuantity: (productId) =>
                set((state) => ({
                    items: state.items
                        .map((item) =>
                            item._id === productId
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                        .filter((item) => item.quantity > 0),
                })),

            updateQuantity: (productId, quantity) =>
                set((state) => ({
                    items:
                        quantity > 0
                            ? state.items.map((item) =>
                                item._id === productId ? { ...item, quantity } : item
                            )
                            : state.items.filter((item) => item._id !== productId),
                })),

            // ❌ bỏ totalItems:0
            clearCart: () => set({ items: [], orderInfo: orderInfoDefault }),

            totalItems: () =>
                get().items.reduce((sum, item) => sum + item.quantity, 0),

            totalPrice: () =>
                get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

            hasItem: (productId) => get().items.some((item) => item._id === productId),

            setOrderInfo: (info) => set({ orderInfo: info }),
            clearOrderInfo: () => set({ orderInfo: orderInfoDefault }),
        }),
        {
            name: "shopping-cart",
        }
    )
);
