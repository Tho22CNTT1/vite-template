import React from "react";
import { useShoppingCartStore } from "@/stores/useShoppingCartStore";
import { Link } from "react-router-dom";

const CartInfoHeader = () => {
    const { items } = useShoppingCartStore((state) => state);

    // ✅ Tính tổng tiền
    const totalAmount = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="relative group">
            {/* Nút hiển thị giỏ */}
            <Link to="/cart" className="flex items-center gap-x-1">
                Cart
                <span className="w-[20px] h-[20px] rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {items.length}
                </span>
            </Link>

            {/* Hover hiển thị mini cart */}
            <div className="cart_info bg-white shadow-lg border rounded-md absolute right-0 top-full mt-2 w-60 hidden group-hover:block z-50">
                {items.length > 0 ? (
                    <div className="p-3">
                        <ul className="divide-y divide-gray-200 max-h-40 overflow-y-auto">
                            {items.map((item) => (
                                <li key={item._id} className="py-1 text-sm">
                                    {item.product_name} - {item.quantity} ×{" "}
                                    {item.price.toLocaleString()}₫
                                </li>
                            ))}
                        </ul>
                        <p className="mt-2 text-sm font-semibold">
                            Total: <strong>{totalAmount.toLocaleString()}₫</strong>
                        </p>
                        <Link
                            to="/cart"
                            className="mt-2 block bg-blue-600 text-white text-center py-1 rounded hover:bg-blue-700"
                        >
                            View Cart
                        </Link>
                    </div>
                ) : (
                    <p className="p-3 text-sm text-gray-500">Your cart is empty</p>
                )}
            </div>
        </div>
    );
};

export default CartInfoHeader;
